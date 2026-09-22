<!-- @format -->

# Recipe Book

A React and Cloudflare Workers recipe archive backed by D1.

## Features

- Submit recipes with repeatable tools, ingredients, and direction fields.
- Browse the recipe archive and open recipe details.
- Show a deterministic daily recipe under "Suggested for you."
- Persist recipes in Cloudflare D1.

## Development

```bash
npm install
npx wrangler d1 migrations apply aq_recipes --local
npm run dev
```

## Verification

```bash
npm run build
npx oxlint src
```

## Deployment

Apply pending production migrations before deploying:

```bash
npx wrangler d1 migrations apply aq_recipes --remote
npm run deploy
```
