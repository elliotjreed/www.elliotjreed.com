import { createRequestHandler } from "react-router";

// biome-ignore lint/suspicious/noEmptyInterface: Env interface may be extended with environment variables in the future
interface Env {}

declare global {
  interface CloudflareEnvironment extends Env {}
}

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(() => import("virtual:react-router/server-build"), import.meta.env.MODE);

export default {
  async fetch(request, env, ctx) {
    const response = await requestHandler(request, {
      cloudflare: { env, ctx },
    });

    // Clone the response to add security headers
    const headers = new Headers(response.headers);

    // Prevent clickjacking
    headers.set("X-Frame-Options", "DENY");

    // Prevent MIME sniffing
    headers.set("X-Content-Type-Options", "nosniff");

    // Control referrer information
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Content Security Policy
    headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; "),
    );

    // Permissions Policy
    headers.set("Permissions-Policy", "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), bluetooth=(), browsing-topics=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(self), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), local-fonts=(self, 'https://fonts.gstatic.com'), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), screen-wake-lock=(), serial=(), speaker-selection=(), usb=(), web-share=(self), xr-spatial-tracking=()");

    // HSTS (Cloudflare serves over HTTPS)
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
