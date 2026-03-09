# State AI – PWA Package

This folder contains everything you need to make **State AI** installable on phones and desktops (Progressive Web App).

## Files
- `manifest.json` – App metadata and icons
- `sw.js` – Service Worker (offline cache & installability)
- `vercel.json` – SPA rewrites for Vercel
- `icons/` – PWA icons (maskable + standard + Apple touch + favicon)
- `snippets/head.html` – Add inside your `<head>`
- `snippets/before_body_close.html` – Add right before `</body>`

## How to integrate
1. Copy **all** files/folders in this package to the **root** of your Vercel project (same level as `index.html`).
2. Open `index.html`:
   - Paste the contents of `snippets/head.html` inside your `<head>`.
   - Paste the contents of `snippets/before_body_close.html` right before `</body>`.
3. Commit & push to your Git repo (or redeploy via Vercel CLI):
   ```bash
   git add .
   git commit -m "Add PWA support (manifest, SW, icons)"
   git push
   ```
4. Visit your site, hard refresh, then **install**:
   - **Android Chrome**: Tap the install banner or menu → *Add to Home screen*.
   - **iOS Safari**: Share → *Add to Home Screen*.
   - **Desktop Chrome/Edge**: Install icon in the address bar.

## Notes
- Icons were generated from the existing State logo style (blue tile with three white bars).
- You can change the theme color in both `manifest.json` and the `<meta name="theme-color">` tag.
- Service worker uses a simple cache with background update (stale-while-revalidate style).
