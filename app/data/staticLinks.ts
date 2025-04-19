export interface StaticLink {
  href: string;
  title: string;
  showInNavigation: boolean;
}

export const staticLinks: StaticLink[] = [
  { href: "/", title: "Home", showInNavigation: false },
  { href: "/ai-prompt-engineering-guide", title: "AI Prompt Guide", showInNavigation: true },
  { href: "/cafe-ai-prompt-framework", title: "CAFE Prompt Framework", showInNavigation: true },
  { href: "/privacy", title: "Privacy Policy", showInNavigation: false },
  { href: "/stay-alert", title: "Stay Alert Generator", showInNavigation: false },
  { href: "/government-tweet", title: "Government Tweet Generator", showInNavigation: false },
  { href: "/travel", title: "Trips and Travels", showInNavigation: false },
  { href: "/the-vape", title: "TheVape.co.uk", showInNavigation: false },
];
