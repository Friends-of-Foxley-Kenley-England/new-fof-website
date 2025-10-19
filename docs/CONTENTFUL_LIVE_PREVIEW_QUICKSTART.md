# Contentful Live Preview - Quick Start

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Preview Token
1. Go to [Contentful](https://app.contentful.com/spaces/jnd8s5ezvg4b/api/keys)
2. Find or create an API key
3. Copy the **Content Preview API - access token**

### Step 2: Update Your .env File
```bash
CONTENTFUL_HOST=preview.contentful.com
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token_here
```

### Step 3: Configure Contentful Preview URLs
1. Go to [Settings → Content preview](https://app.contentful.com/spaces/jnd8s5ezvg4b/settings/content_preview)
2. Add preview URL for **News**: `http://localhost:8000/news/{entry.fields.slug}?preview=true`
3. Add preview URL for **Work Days**: `http://localhost:8000/work-days/{entry.fields.slug}?preview=true`

### Step 4: Start Development Server
```bash
yarn develop
```

### Step 5: Test It!
1. Open any News or Work Day entry in Contentful
2. Click "Open preview" in the sidebar
3. Edit content in Contentful
4. Watch it update live! ✨

## 📝 Usage

- **Enable Preview**: Add `?preview=true` to any page URL
- **Inspector Mode**: Click on content to jump to Contentful editor
- **Live Updates**: Changes appear instantly without refresh

## 🔧 Troubleshooting

**Not working?**
- ✅ Check `.env` has `CONTENTFUL_HOST=preview.contentful.com`
- ✅ Verify URL includes `?preview=true`
- ✅ Restart dev server after changing `.env`

**Need more help?** See [docs/contentful-live-preview.md](./docs/contentful-live-preview.md)
