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

- Upcoming Events: Breakfast and Connections, October 13, 2026, 11 am to 2 pm, Chai and Chill, Milton.
- Recent Events: Mom's Meetup, September 24, 2026, 11:30 am to 2 pm, Chai Social, Milton.
- Team names, roles, and Gmail/Facebook contact information match the supplied website.
- The decorative `PLANS` label on Get Involved was preserved from the reference; it can be removed if preferred.

All recreated pages use clear page titles and working relative links. The original Base44 edit badge and unrelated template link are omitted. Images are optimized WebP copies of the images supplied on the reference website. Fonts are bundled under their accompanying open-source licences.
