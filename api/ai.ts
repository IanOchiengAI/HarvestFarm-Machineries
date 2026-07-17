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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY environment variable is not set.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const url = new URL(request.url);
  const path = url.searchParams.get('path') || '';

  // Construct target Gemini API URL
  const targetUrl = new URL(`https://generativelanguage.googleapis.com/${path}`);
  
  // Forward other query parameters, but exclude 'path' which we injected
  url.searchParams.forEach((value, key) => {
    if (key !== 'path') {
      targetUrl.searchParams.set(key, value);
    }
  });

  // Append the key query parameter
  targetUrl.searchParams.set('key', apiKey);

  // Clone headers and remove host/origin to avoid forwarding issues
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('origin');

  try {
    const body = request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text();

    const response = await fetch(targetUrl.toString(), {
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
    return new Response(JSON.stringify({ error: 'Failed to fetch from Gemini API', details: error?.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
