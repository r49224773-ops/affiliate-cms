# Affiliate CMS Starter (Free)

Complete free affiliate website with:

- Next.js frontend
- Decap CMS (WordPress-like admin)
- GitHub as database
- Cloudflare Pages hosting

## Quick Start

### 1. Create GitHub repository
1. Go to https://github.com/new
2. Name it `affiliate-cms`
3. Keep it **Public**
4. Click Create repository

### 2. Upload this project
You can either:
- Download this folder and push it to your new repo, or
- Use the GitHub web interface to upload the files

### 3. Update Decap config
Open `public/admin/config.yml` and change this line:

```yaml
repo: YOUR_GITHUB_USERNAME/affiliate-cms
```

to your real username, for example:

```yaml
repo: johndoe/affiliate-cms
```

### 4. Deploy to Cloudflare Pages (Free)

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select your `affiliate-cms` repository
4. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
5. Click **Save and Deploy**

### 5. Enable GitHub login for the admin

1. Go to https://github.com/settings/developers
2. Click **New OAuth App**
3. Fill in:
   - Application name: `Affiliate CMS`
   - Homepage URL: `https://your-site.pages.dev`
   - Authorization callback URL: `https://api.github.com` (temporary, we will change it)
4. After creating, note the **Client ID**

For Decap CMS with GitHub on Cloudflare, the easiest free method is using the Git Gateway alternative or the official GitHub backend with a personal access token for private use, or set up a simple Cloudflare Worker for the auth.

### Simple local testing first

```bash
npm install
npm run dev
```

Then open:
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

## Admin Features

- Create / edit articles
- Create product reviews
- Add affiliate links
- Pros & Cons
- Categories & tags
- Featured images
- SEO title & description
- Draft / Published status

## Folder Structure

```
content/
  posts/          ← articles
  products/       ← product reviews
public/
  admin/          ← Decap CMS
  images/         ← uploaded images
src/
  app/            ← Next.js pages
  lib/            ← content helpers
```

## Next Steps

1. Change the site name and colors in `src/app/layout.tsx` and `tailwind.config.js`
2. Write your first real product review
3. Add your real affiliate links
4. Connect a custom domain in Cloudflare Pages (free)
