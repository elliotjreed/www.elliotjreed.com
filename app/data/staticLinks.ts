import { type NavigationNode, navigationTree, pageById } from "./contentRegistry";

export interface StaticLink {
  href?: string;
  title: string;
  showInNavigation: boolean;
  children?: StaticLink[];
}

const resolvePagePath = (pageId: string): string => {
  const page = pageById[pageId];
  if (!page) {
    throw new Error(`Navigation references unknown page id: ${pageId}`);
  }
  return page.path;
};

const buildStaticLinks = (nodes: NavigationNode[]): StaticLink[] =>
  nodes.map((node) => ({
    href: node.pageId ? resolvePagePath(node.pageId) : undefined,
    title: node.title,
    showInNavigation: node.showInNavigation,
    children: node.children ? buildStaticLinks(node.children) : undefined,
  }));

export const staticLinks: StaticLink[] = buildStaticLinks(navigationTree);
