export const config = {
  runtime: 'edge',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// --- In-memory rate limiter (per Edge instance) ---
// Tracks: { [ip]: { count: number, windowStart: number } }
const ipRequestMap = new Map<string, { count: number; windowStart: number }>();

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 15;   // max 15 requests per IP per minute
const MAX_BODY_SIZE_BYTES = 8_000;    // ~8KB max request body

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    // Start a new window
    ipRequestMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

export default async function handler(request: Request) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  // --- Rate limiting ---
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('cf-connecting-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please slow down and try again shortly.' }),
      { status: 429, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }

  // --- Validate API key ---
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return new Response(
      JSON.stringify({ error: 'GROQ_API_KEY environment variable is not configured.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }

  try {
    // --- Body size guard ---
    const bodyText = await request.text();
    if (bodyText.length > MAX_BODY_SIZE_BYTES) {
      return new Response(
        JSON.stringify({ error: 'Request body too large.' }),
        { status: 413, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // --- Validate JSON structure ---
    let parsed: any;
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
      );
    }

    // --- Enforce model whitelist (prevent model switching abuse) ---
    const allowedModels = ['llama-3.3-70b-versatile', 'llama3-8b-8192'];
    if (!allowedModels.includes(parsed.model)) {
      parsed.model = 'llama-3.3-70b-versatile';
    }

    // --- Enforce token cap ---
    if (!parsed.max_tokens || parsed.max_tokens > 800) {
      parsed.max_tokens = 800;
    }

    // --- Call Groq ---
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed),
    });

    const responseText = await groqResponse.text();
    const status = Math.min(Math.max(groqResponse.status, 200), 599);

    return new Response(responseText, {
      status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch from Groq API', details: error?.message }),
      { status: 502, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }
}
