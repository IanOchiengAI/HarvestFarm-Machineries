# Security Headers Guidance

This document outlines the required security headers and practices for deploying the HarvestFarm Machineries website to production.

## 1. HTTP Security Headers

When deploying to a web server (e.g., Nginx, Apache) or a static host (e.g., Vercel, Netlify), ensure the following headers are set on all responses:

- **X-Frame-Options**: `DENY`
  - Prevents the site from being framed, mitigating clickjacking attacks.
- **X-Content-Type-Options**: `nosniff`
  - Prevents the browser from trying to guess the MIME type, mitigating MIME confusion attacks.
- **Referrer-Policy**: `strict-origin-when-cross-origin`
  - Controls how much referrer information is included with requests.
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=()`
  - Restricts the use of browser features that are not needed by the application.
- **Strict-Transport-Security (HSTS)**: `max-age=31536000; includeSubDomains; preload`
  - Forces the browser to only use HTTPS. Ensure your site is fully HTTPS before enabling `preload`.

### Vercel Example (`vercel.json`)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ]
}
```

## 2. API Key Management in Production

The `vite.config.ts` proxy is only for local development. In production, the client bundle must never contain the `GEMINI_API_KEY`. 

**Implementation for Vercel/Netlify:**
1. Create a serverless function (e.g., `api/ai.ts` in Next.js or Vercel Serverless Functions).
2. The function should read the `GEMINI_API_KEY` from the environment variables securely.
3. The client (`services/aiService.ts`) calls this serverless function instead of directly calling the Google API.
4. The serverless function makes the request to `generativelanguage.googleapis.com` and returns the response to the client.

## 3. CORS Policy

If using a separate backend for API requests (like the AI proxy), ensure your CORS policy is strict. It should only allow requests from your specific domain (`harvestfarmnk.co.ke`).

## 4. Rate Limiting

The `/api/ai` endpoint (or serverless function) should implement strict rate limiting to prevent API abuse and cost overruns.
- E.g., limit each IP to 5 requests per minute.
- Use tools like Vercel KV or Upstash Redis to track and enforce rate limits.
