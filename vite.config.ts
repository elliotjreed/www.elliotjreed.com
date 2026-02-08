import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    target: "esnext",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    assetsInlineLimit: 4096,
    esbuild: { drop: ["console", "debugger"] },
    define: { "process.env.NODE_ENV": '"production"' },
    rollupOptions: isSsrBuild
      ? {
          input: "./workers/app.ts",
        }
      : undefined,
  },
  plugins: [
    cloudflareDevProxy({
      getLoadContext({ context }) {
        return { cloudflare: context.cloudflare };
      },
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/sitemap\.xml$/],
      },
      manifest: {
        name: "Elliot J. Reed",
        short_name: "EJR",
        description: "Personal website of Elliot J. Reed.",
        theme_color: "#1f2937",
        background_color: "#ffffff",
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
          {
            src: "icon-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-maskable-96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icon-maskable-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
}));
