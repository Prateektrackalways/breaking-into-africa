# Claude Code Prompt — "Breaking Into Africa" Full Image & Author Update

## Context

I'm updating the ebook site at https://guide.prateek.africa/ — the repo for this project is already cloned locally. I'm providing the following image assets (all already in the project root or an `/assets` folder — place them in the correct directories):

| File | Size | Purpose |
|------|------|---------|
| `cover_web.png` | 1200×1600 | Main cover image for website (hero, landing page, reader) |
| `cover_web.jpg` | 1200×1600 | Lighter JPG fallback of the same cover |
| `cover_hires.jpg` | 2550×3300 | High-res cover for downloadable PDF (300dpi, 8.5×11") |
| `cover_print.pdf` | 8.5×11" 300dpi | Print-ready PDF cover page |
| `cover_email_banner.jpg` | 600×300 | Email-optimized banner with title overlay |
| `author_portrait_square.jpg` | 800×800 | Author photo — square crop for web/PDF about page |
| `author_portrait_circle.png` | 800×800 | Author photo — circular crop with transparent bg for email/cards |

---

## TASK 1 — Landing Page (guide.prateek.africa)

1. Replace any existing cover/hero image with `cover_web.png`
2. Display it prominently as the main visual — centered, with a CSS book shadow effect:
   ```css
   box-shadow: 0 25px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2);
   border-radius: 4px;
   ```
3. Make it responsive: `max-width: 420px` on desktop, `max-width: 90vw` on mobile
4. Below or near the cover, ensure these text elements exist:
   - Title: **Breaking Into Africa**
   - Subtitle: *A Practical Guide for Entrepreneurs*
   - Author: **Prateek Jain**
   - Tagline: *From Bhopal to Nairobi — Lessons in Building Across Borders*

---

## TASK 2 — Web Reader Version (inside the ebook)

1. Add `cover_web.png` as the **first page / splash screen** of the web reader before Chapter 1
2. It should display full-width within the reader's content area, centered, with no text overlaid (the image already has typography baked in)
3. Add a page break or section divider after the cover before the table of contents / first chapter

---

## TASK 3 — Downloadable PDF Version

1. Insert `cover_hires.jpg` (or `cover_print.pdf`) as **page 1** of the downloadable PDF — full bleed, no margins, no headers/footers on this page
2. Page numbering should start from the page AFTER the cover (or from the Table of Contents)
3. If generating the PDF programmatically, use `cover_print.pdf` as-is for page 1 for best quality

---

## TASK 4 — "About the Author" Page (NEW — add to both web and PDF)

Create an **"About the Author"** section using `author_portrait_square.jpg`. Add it as the **last page/section** of both the web version and the PDF.

### Layout:
- Author photo displayed as a rounded rectangle (border-radius: 12px) or circle, roughly 200–250px wide, floated left or centered above the text
- For PDF: place the photo left-aligned with text wrapping around it

### Content:

```
About the Author

Prateek Jain is an entrepreneur, builder, and cross-border operator based in Nairobi, Kenya. Originally from Bhopal, India, he moved to East Africa to build businesses at the intersection of technology, logistics, and services.

He is the Director and co-owner of Trackalways Ltd., a GPS tracking and telematics company operating across Kenya and Uganda, and runs Anasa Living (serviced apartments in Nairobi) and Code Crumble (web development and SaaS tools).

With experience spanning cloud kitchens, printing, fresh produce trade, IoT hardware, and SaaS platforms — across India, Africa, the UAE, and beyond — Prateek has navigated the real challenges of building in emerging markets: from regulatory hurdles and cross-border payments to hiring, cultural adaptation, and finding product-market fit on the ground.

"Breaking Into Africa" distills these hard-won lessons into a practical, no-fluff guide for entrepreneurs looking to enter or expand across the African continent.

Connect with Prateek:
→ prateek.africa
→ trackalways.com
→ LinkedIn: Prateek Jain
```

### Styling:
- Warm, clean design — off-white or light cream background (#FFFAF0 or similar)
- Author name in a serif font, body text in a clean sans-serif
- Subtle top border or divider separating it from the last chapter
- Links should be styled but not aggressively colored — muted gold (#C8A84E) or dark teal

---

## TASK 5 — Welcome / Drip Email Template

If there's a welcome email or email template in the codebase (e.g., for Mailchimp, Resend, SendGrid, or custom SMTP):

1. Add `cover_email_banner.jpg` (600×300) as the **hero image** at the top of the email
2. Add `author_portrait_circle.png` (scaled to ~80px diameter) next to the author sign-off at the bottom of the email
3. If no email template exists, create one at `/emails/welcome.html` with:
   - Hero banner image at top
   - Brief welcome message: "Thanks for downloading Breaking Into Africa! Here's your guide to building businesses across the continent."
   - CTA button linking to the web reader
   - Author sign-off with circular photo and name
   - Footer with links to prateek.africa and trackalways.com

---

## TASK 6 — SEO & Meta Tags

Update the site's `<head>` with:

```html
<meta property="og:title" content="Breaking Into Africa — A Practical Guide for Entrepreneurs" />
<meta property="og:description" content="From Bhopal to Nairobi — hard-won lessons on building businesses across the African continent. By Prateek Jain." />
<meta property="og:image" content="[FULL_URL_TO_cover_web.jpg]" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="1600" />
<meta property="og:type" content="book" />
<meta property="og:url" content="https://guide.prateek.africa/" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Breaking Into Africa — Prateek Jain" />
<meta name="twitter:description" content="A practical guide for entrepreneurs entering the African market." />
<meta name="twitter:image" content="[FULL_URL_TO_cover_web.jpg]" />
<meta name="author" content="Prateek Jain" />
```

Also set the favicon to a cropped version of the cover or use the existing site favicon.

---

## TASK 7 — Any Other Touchpoints

Search the entire codebase for:
- Any placeholder images, stock photos, or dummy covers → replace with the appropriate cover asset
- Any hardcoded author bio text → update to match the bio above
- Any `alt` tags on images → set to descriptive text like `alt="Breaking Into Africa ebook cover by Prateek Jain"`
- Any 404 or empty-state pages that could benefit from the cover or author image

---

## File Placement Summary

Place all assets in the project's image/asset directory (e.g., `/public/images/`, `/assets/`, `/static/` — whatever the project uses):

```
/assets/images/cover_web.png          ← landing page + web reader
/assets/images/cover_web.jpg          ← OG image + fallback
/assets/images/cover_hires.jpg        ← PDF generation
/assets/images/cover_print.pdf        ← PDF cover page
/assets/images/cover_email_banner.jpg ← email template hero
/assets/images/author_portrait.jpg    ← about page (square)
/assets/images/author_portrait_circle.png ← email sign-off
```

After making all changes, build and deploy. Verify the landing page loads the new cover, the OG image works (test with https://www.opengraph.xyz/), and the PDF download includes the cover as page 1 and the About the Author as the last page.
