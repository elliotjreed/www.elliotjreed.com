import { index, type RouteConfig, route } from "@react-router/dev/routes";
import { sitePages } from "./data/contentRegistry";

const indexRoute = sitePages.find((page) => page.index);
const routes = sitePages.filter((page) => !page.index);

if (!indexRoute) {
  throw new Error("Missing index route configuration in content registry.");
}

export default [
  index(indexRoute.routeFile),
  // Strip leading slash to keep route paths consistent with React Router expectations.
  ...routes.map((page) => route(page.path.replace(/^\//, ""), page.routeFile)),
] satisfies RouteConfig;
