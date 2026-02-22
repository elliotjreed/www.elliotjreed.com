import { navigationTree, pageById, type NavigationNode } from "../../app/data/contentRegistry.js";

function buildSidebarLinks(nodes: NavigationNode[]): string {
  const items = nodes
    .filter((node) => node.showInNavigation)
    .map((node) => {
      const href = node.pageId ? pageById[node.pageId]?.path : undefined;

      if (node.children?.length) {
        const children = node.children.filter((c) => c.showInNavigation);
        if (children.length === 0) return "";

        // Check if any child has its own children (sub-sections)
        const hasSubsections = children.some((c) => c.children?.length);

        if (hasSubsections) {
          // Parent category with subsections (e.g., "Guides" > "AI Guides" > articles)
          const subsections = children
            .map((child) => {
              const childHref = child.pageId ? pageById[child.pageId]?.path : undefined;
              if (child.children?.length) {
                const grandchildren = child.children
                  .filter((gc) => gc.showInNavigation)
                  .map((gc) => {
                    const gcHref = gc.pageId ? pageById[gc.pageId]?.path : undefined;
                    return gcHref ? `<li><a href="${gcHref}">${gc.title}</a></li>` : "";
                  })
                  .join("");
                return `<li><div class="sidebar-section-label">${child.title}</div><ul class="sidebar-subsection">${grandchildren}</ul></li>`;
              }
              return childHref ? `<li><a href="${childHref}">${child.title}</a></li>` : "";
            })
            .join("");

          return `<li>
            <div class="sidebar-section-label">${node.title}</div>
            <ul>${subsections}</ul>
          </li>`;
        } else {
          // Simple parent with direct children
          const childLinks = children
            .map((child) => {
              const childHref = child.pageId ? pageById[child.pageId]?.path : undefined;
              return childHref ? `<li><a href="${childHref}">${child.title}</a></li>` : "";
            })
            .join("");
          return `<li>
            <div class="sidebar-section-label">${node.title}</div>
            <ul>${childLinks}</ul>
          </li>`;
        }
      }

      return href ? `<li><a href="${href}">${node.title}</a></li>` : "";
    })
    .join("");

  return items;
}

export function renderNavigation(): string {
  const sidebarLinks = buildSidebarLinks(navigationTree);

  return `<amp-sidebar id="sidebar" layout="nodisplay" side="right">
  <div class="sidebar-inner">
    <div class="sidebar-header">
      <span class="sidebar-title">Menu</span>
      <button class="sidebar-close-btn" on="tap:sidebar.close" type="button" aria-label="Close menu">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <nav class="sidebar-nav" aria-label="Main navigation">
      <ul>${sidebarLinks}</ul>
    </nav>
  </div>
</amp-sidebar>

<header class="site-header" aria-label="Site header">
  <div class="nav-inner">
    <a href="/" class="site-logo" aria-label="Elliot J. Reed - Home">EJR</a>
    <button class="menu-btn" on="tap:sidebar.toggle" type="button" aria-label="Open navigation menu" aria-controls="sidebar">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>
</header>`;
}
