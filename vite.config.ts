import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  build: {
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "oxc",
    assetsInlineLimit: 4096,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    VitePWA({
      outDir: "build/client",
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,ico,png,svg,woff2}"],
        navigateFallback: null,
      },
      manifest: {
        name: "Elliot J. Reed",
        short_name: "EJR",
        description: "Personal website of Elliot J. Reed.",
        theme_color: "#fbf5f4",
        background_color: "#fbf5f4",
        display: "standalone",
        orientation: "natural",
        scope: "/",
        lang: "en-GB",
        dir: "ltr",
        start_url: "/?utm_source=pwa",
        prefer_related_applications: false,
        display_override: ["window-controls-overlay", "standalone", "fullscreen", "browser"],
        edge_side_panel: {},
        handle_links: "preferred",
        scope_extensions: [{ origin: "https://www.elliotjreed.com" }],
        launch_handler: {
          client_mode: ["navigate-existing", "auto"],
        },
        icons: [
          { src: "/favicon.png", type: "image/png", sizes: "1024x1024" },
          { src: "/icon-96.png", type: "image/png", sizes: "96x96" },
          { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
          { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
          { src: "/favicon.png", type: "image/png", sizes: "1024x1024", purpose: "maskable" },
          { src: "/icon-96.png", type: "image/png", sizes: "96x96", purpose: "maskable" },
          { src: "/icon-192.png", type: "image/png", sizes: "192x192", purpose: "maskable" },
          { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
          { src: "/favicon.svg", type: "image/svg+xml", purpose: "maskable" },
          { src: "/favicon.svg", type: "image/svg+xml" },
        ],
      },
    }),
  ],
});
