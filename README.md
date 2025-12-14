# Next.js Social Downloader (RapidAPI)

- Calls RapidAPI `/v1/social/autolink` server-side
- Extracts `medias[]` across platforms (TikTok / YouTube / Instagram etc.)
- Streams downloads through `/api/download` to avoid CORS and set filenames

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

Put your key in `.env.local`:
```env
RAPIDAPI_KEY=...
RAPIDAPI_HOST=social-download-all-in-one.p.rapidapi.com
```
