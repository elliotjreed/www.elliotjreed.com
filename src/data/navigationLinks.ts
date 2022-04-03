export interface NavigationLink {
  href: string;
  title: string;
}

export const navigationLinks: NavigationLink[] = [
  { href: "/cv", title: "CV" },
  { href: "/travel", title: "Travelling" },
  { href: "/contact", title: "Contact" },
  { href: "/blog", title: "Blog" },
  { href: "/projects", title: "Projects" }
];
