# Contentful Live Preview Setup

This guide explains how to use Contentful Live Preview in the Friends of Foxley website.

## What is Contentful Live Preview?

Contentful Live Preview allows content editors to see changes in real-time as they edit content in Contentful, without needing to rebuild the entire Gatsby site. This significantly speeds up the content editing workflow.

## Architecture

This site uses a **two-domain approach**:
- **Production domain**: Uses Contentful Delivery API (published content only)
- **Preview domain**: Uses Contentful Preview API with live preview enabled (draft + published content with real-time updates)

## Setup Instructions

### 1. Configure Environment Variables

**For Production Environment** (`.env` or deployment config):
```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
# Do NOT set CONTENTFUL_HOST or GATSBY_CONTENTFUL_PREVIEW_MODE
```

**For Preview Environment** (`.env.preview` or preview deployment config):
```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_HOST=preview.contentful.com
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
GATSBY_CONTENTFUL_PREVIEW_MODE=true
```

**Getting your Preview Access Token:**
1. Go to your Contentful space
2. Navigate to Settings → API keys
3. Create a new API key or use an existing one
4. Copy the "Content Preview API - access token"
5. Add it to your `.env` file as `CONTENTFUL_PREVIEW_ACCESS_TOKEN`

### 2. Configure Contentful Space

In your Contentful space settings:

1. Go to **Settings → Content preview**
2. Add content preview URLs for each content type:

**For News entries:**
   - **Name**: Preview Environment
   - **URL**: `https://your-preview-domain.com/news/{entry.fields.slug}`
   - **Content types**: News

**For Work Day entries:**
   - **Name**: Preview Environment
   - **URL**: `https://your-preview-domain.com/work-days/{entry.fields.slug}`
   - **Content types**: Work Day

**For local development:**
   - **URL**: `http://localhost:8000/news/{entry.fields.slug}` (or `/work-days/...`)

### 3. Using Live Preview

#### During Development:

1. Set up your local environment with preview mode enabled:
   ```bash
   # In your .env file:
   CONTENTFUL_HOST=preview.contentful.com
   CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
   GATSBY_CONTENTFUL_PREVIEW_MODE=true
   ```

2. Start your Gatsby development server:
   ```bash
   yarn develop
   ```

3. In Contentful, open any News or Work Day entry

4. Click the "Open preview" button in the sidebar

5. Your local site will open and changes will update in real-time!

#### In Production:

- **Production domain**: No live preview, uses cached published content
- **Preview domain**: Live preview enabled, shows draft content with real-time updates

#### Features:

- **Live Updates**: Changes appear immediately without page refresh
- **Inspector Mode**: Click on content elements to jump to the corresponding field in Contentful
- **Visual Editing**: See exactly how your content will look on the live site
- **Environment-based**: Automatically enabled/disabled based on `GATSBY_CONTENTFUL_PREVIEW_MODE`

## How It Works

The implementation consists of several parts:

### 1. Context Provider (`ContentfulLivePreviewProvider.jsx`)
Wraps the entire app and enables live preview features when `GATSBY_CONTENTFUL_PREVIEW_MODE=true` environment variable is set.

### 2. Custom Hook (`use-contentful-live-updates.js`)
Provides a simple hook to enable live updates for any component:

```javascript
import { useContentfulLivePreview } from "../hooks/use-contentful-live-updates";

const MyComponent = ({ data }) => {
  const liveData = useContentfulLivePreview(data);
  // Use liveData instead of data
};
```

### 3. Updated Templates
Both `blog-post.jsx` and `work-day-information.jsx` now support live preview.

### 4. GraphQL Queries
Queries include `contentful_id` and `sys` fields required for live preview tracking.

## Troubleshooting

### Preview not updating?

1. **Check environment variables**: Ensure these are set in your preview environment:
   - `CONTENTFUL_HOST=preview.contentful.com`
   - `CONTENTFUL_PREVIEW_ACCESS_TOKEN` (your preview token)
   - `GATSBY_CONTENTFUL_PREVIEW_MODE=true`
2. **Check browser console**: Look for any errors from the Contentful Live Preview SDK
3. **Restart dev server**: Required after changing environment variables
4. **Verify you're on preview domain**: Live preview only works when the environment variable is set

### Inspector mode not working?

1. Ensure you're using the Preview API (not Delivery API)
2. Check that GraphQL queries include the `sys` and `contentful_id` fields
3. Verify that the content type is configured in Contentful's preview settings

### Changes not appearing?

1. Make sure you're viewing the correct environment in Contentful
2. Check that the content is published or in draft state (preview shows both)
3. Verify network requests in browser DevTools to ensure preview API is being called

## Adding Live Preview to New Templates

To add live preview support to a new template:

1. Import the hook:
   ```javascript
   import { useContentfulLivePreview } from "../hooks/use-contentful-live-updates";
   ```

2. Use it in your component:
   ```javascript
   const MyTemplate = ({ data }) => {
     const liveData = useContentfulLivePreview(data);
     const content = liveData.contentfulYourContentType;
     // ... rest of component
   };
   ```

3. Update your GraphQL query to include:
   ```graphql
   contentfulYourContentType(id: { eq: $id }) {
     id
     contentful_id
     sys {
       contentType {
         sys {
           id
         }
       }
     }
     # ... other fields
   }
   ```

## Performance Considerations

- Live preview only activates when `GATSBY_CONTENTFUL_PREVIEW_MODE=true` is set
- Production environment has zero overhead - preview code is inactive
- Preview mode uses the Contentful Preview API, which has different rate limits than the Delivery API
- The two-domain approach ensures production performance is never impacted by preview features

## Resources

- [Contentful Live Preview Documentation](https://www.contentful.com/developers/docs/tutorials/general/live-preview/)
- [Gatsby + Contentful Integration](https://www.gatsbyjs.com/docs/how-to/sourcing-data/sourcing-from-contentful/)
