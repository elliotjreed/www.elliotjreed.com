import type { Config } from "@react-router/dev/config";
import { staticLinks, type StaticLink } from "./app/data/staticLinks";

const extractHrefs = (links: StaticLink[]): string[] => {
  const hrefs: string[] = [];

  for (const link of links) {
    if (link.href) {
      hrefs.push(link.href);
    }
    if (link.children) {
      hrefs.push(...extractHrefs(link.children));
    }
  }

  return hrefs;
};

export default {
  ssr: true,
  async prerender() {
    return extractHrefs(staticLinks);
  },
} satisfies Config;
