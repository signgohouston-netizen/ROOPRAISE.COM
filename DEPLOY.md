# Deploying Roopraise to Vercel

The project is a standard Next.js 15 app — Vercel auto-detects everything (build
command, output, image optimization). No environment variables are required.

## Option A — Vercel CLI (fastest, ~1 minute)

From the project folder (`C:\Users\Azeem\Desktop\ROOPRAISE`):

```bash
npx vercel login
```

Pick your sign-in method (GitHub, GitLab, email…) and confirm in the browser/email.
Then deploy a shareable preview URL:

```bash
npx vercel
```

Accept the defaults it offers (scope, link to a new project, keep the name).
When it finishes it prints a URL like `https://rooprise-xxxx.vercel.app` — that's
the link to send your client.

To publish the production URL instead:

```bash
npx vercel --prod
```

## Option B — GitHub + Vercel dashboard (best for ongoing updates)

1. Create an empty repo on GitHub (e.g. `roopraise`).
2. Push this project:
   ```bash
   git remote add origin https://github.com/<you>/roopraise.git
   git branch -M main
   git push -u origin main
   ```
3. Go to https://vercel.com/new, import the repo, and click **Deploy**.
   Every future `git push` auto-deploys.

## Notes
- Product/category imagery loads from Unsplash; `next.config.mjs` already
  allow-lists those hosts for Vercel's image optimizer.
- This is a front-end demo (in-memory catalog, simulated checkout). Cart,
  favorites, and dashboard edits persist in the visitor's browser via
  `localStorage`, which works the same on Vercel.
