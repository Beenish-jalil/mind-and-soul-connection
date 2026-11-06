# Mind and Soul Community Connection

An independent, static recreation of the supplied Base44 website. All images and fonts are included locally. No build command, paid subscription, or Base44 service is needed.

## Publish on GitHub Pages

1. Create a free GitHub account if you do not already have one.
2. Create a **public** repository named `mind-and-soul-community-connection`.
3. Unzip this package. Upload the **contents** of this folder, including `assets`, directly to the repository. `index.html` must be at the top level. Do not upload only the ZIP.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Select **main**, **/(root)**, and **Save**.
5. Wait for the deployment to finish. GitHub will show the website URL in Settings → Pages.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Connect a domain

After the GitHub URL works, add your exact domain in **Settings → Pages → Custom domain**. Follow GitHub's current DNS instructions at your domain provider, then enable **Enforce HTTPS** when available. The domain is deliberately not preconfigured: confirm the domain and GitHub account before changing DNS.

Official instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Edit the website

- `index.html`: homepage, upcoming event, and journey wording.
- `about.html`: story, approach, values, mission, vision, and team.
- `programs.html`: programs and activities.
- `get-involved.html`: volunteer, collaboration, and community tabs.
- `contact.html`: contact information and inquiry form.
- `styles.css`: colours, spacing, and responsive layouts.
- `script.js`: mobile menu, tabs, and email draft form.
- `assets`: local images and fonts.

To change wording on GitHub, open the HTML file, select the pencil icon, edit the text, and commit the change. GitHub Pages will publish the update automatically.

## Contact form

The form opens a draft in the visitor's configured email app. The visitor must send the draft. It does not save messages, send them automatically, or use a Base44 backend. A server-backed form can be added later if required.

## Content to review before launch

- Events: Upcoming and Recent Events on the homepage are loaded from a Google Sheet (see "Managing events" below).
- Team names, roles, and Gmail/Facebook contact information match the supplied website.
- The decorative `PLANS` label on Get Involved was preserved from the reference; it can be removed if preferred.

All recreated pages use clear page titles and working relative links. The original Base44 edit badge and unrelated template link are omitted. Images are optimized WebP copies of the images supplied on the reference website. Fonts are bundled under their accompanying open-source licences.

## Managing events

Homepage events come from the Google Sheet **Mind and Soul – Website Events**
(https://docs.google.com/spreadsheets/d/1WRlj1d_b8PLBX-mJ6-vYEjBKtfZutCYFgVf7KDtyyms/edit).

- One row per event. Columns: **Title**, **Date**, **Time**, **Location**, **Note** (optional, e.g. "FREE EVENT").
- Type dates like `2026-12-05`. Rows without a Title or a readable Date are skipped.
- Events dated today or later appear under **Upcoming Events** (soonest first); past events appear under **Recent Events** (newest first, up to 3). Each section hides itself when it has no events.
- Delete a row to remove an event. Changes appear on the site within a few minutes.
- The sheet must stay shared as "Anyone with the link: Viewer" so the site can read it. Everything in it is public.
- If the sheet can't be reached, the homepage falls back to the event written in `index.html`.
