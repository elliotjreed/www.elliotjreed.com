import { socialLinksHtml } from "./socialIcons.js";

export function renderFooter(): string {
  return `<footer class="site-footer" aria-label="Site footer">
  <div class="footer-inner">
    <div class="footer-social" aria-label="Social media links">
      ${socialLinksHtml}
    </div>
    <div class="footer-links">
      <a href="/privacy">Privacy Policy</a>&nbsp;|&nbsp;<a href="/sitemap">Sitemap</a>
    </div>
    <div class="footer-copy">
      <a href="/">© <strong>Elliot J. Reed</strong></a>
    </div>
  </div>
</footer>`;
}
