/**
 * ============================================================================
 * SFL COMMUNITY API PROXY WORKER (Cloudflare Worker)
 * ============================================================================
 * Script Worker untuk mem-proxy request dari SFL Hub ke Sunflower Land API
 * dengan menyertakan header CORS dan x-api-key secara aman.
 * ============================================================================
 */

export default {
  async fetch(request, env, _ctx) {
    // Tangani preflight CORS (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        },
      });
    }

    const url = new URL(request.url);
    const targetUrl = `https://api.sunflower-land.com${url.pathname}${url.search}`;
    const apiKey = env.SFL_API_KEY || "";

    const newHeaders = new Headers(request.headers);
    if (apiKey) {
      newHeaders.set("x-api-key", apiKey);
    }

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
      redirect: "follow",
    });

    try {
      const response = await fetch(modifiedRequest);
      const newResponse = new Response(response.body, response);
      
      // Set CORS headers pada respons
      newResponse.headers.set("Access-Control-Allow-Origin", "*");
      newResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      newResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");

      return newResponse;
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
