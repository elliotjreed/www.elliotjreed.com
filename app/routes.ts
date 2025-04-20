import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("ai/ai-prompt-engineering-guide", "routes/ai/ai-prompt-engineering-guide.tsx"),
  route("ai/cafe-ai-prompt-framework", "routes/ai/cafe-ai-prompt-framework.tsx"),
  route("sitemap", "routes/sitemap.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("travel", "routes/travel.tsx"),
  route("stay-alert", "routes/stay-alert.tsx"),
  route("government-tweet", "routes/government-tweet.tsx"),
  route("the-vape", "routes/the-vape.tsx"),
] satisfies RouteConfig;
