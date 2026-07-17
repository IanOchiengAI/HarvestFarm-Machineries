export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY environment variable is not set.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  // Clone headers and remove host/origin to avoid forwarding issues
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('origin');
  headers.set('Authorization', `Bearer ${apiKey}`);
  headers.set('Content-Type', 'application/json');

  try {
    const body = request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: request.method,
      headers,
      body,
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Failed to fetch from Groq API', details: error?.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
