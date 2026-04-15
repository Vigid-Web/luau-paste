# Luau Paste - Cloudflare Pages + KV

Serverless pastebin for Luau scripts. Raw URLs work with `loadstring(game:HttpGet(...))()`

## Stack
- Cloudflare Pages (static frontend)
- Pages Functions (serverless API)
- Cloudflare KV (storage, 30-day TTL)

## Quick Deploy

### 1. GitHub
```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/YOURUSER/luau-paste.git
git push -u origin main
```

### 2. Cloudflare
1. Go to dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Select your repo
3. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Output directory: public
4. Before deploy, create KV:
   - Workers & Pages → KV → Create namespace → name "PASTES"
   - Copy the ID
5. In Pages project → Settings → Functions → KV bindings → Add binding:
   - Variable name: PASTES
   - KV namespace: PASTES
6. Deploy

### 3. Update wrangler.toml (optional for local dev)
Replace REPLACE_WITH_YOUR_KV_ID with real IDs

### Local dev
```bash
npm install -g wrangler
wrangler pages dev public
```

## Usage
POST /api/paste with raw text body → returns { raw: "https://.../raw/abc123" }

Luau:
```lua
loadstring(game:HttpGet("https://your-domain.pages.dev/raw/abc123"))()
```
