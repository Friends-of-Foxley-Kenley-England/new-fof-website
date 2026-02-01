# Redirects

There's 2 places redirects can be set

1. In `firebase.json`
2. In `redirects.json`

## firebase.json

This is used for permanent redirects (301s).

Use this method out of preference.

- https://firebase.google.com/docs/hosting/full-config
- https://firebase.google.com/docs/hosting/full-config#redirects
- https://firebase.google.com/docs/hosting/full-config#rewrites

## redirects.json

The URL doesn't change, but the content shows the redirected content. I may remove this later. ATM it seems a good fallback for if the redirects aren't set in the hosting provider (eg in the event of switching hosting providers).

eg

```json
{
  "fromPath": "/pages/english_oak.html",
  "componentPath": "./src/pages/trees/english-oak.jsx"
}
```

When going to `https://www.friendsoffoxley.co.uk/pages/english_oak.html`, it will show the content from this component`./src/pages/trees/english-oak.jsx`, and the URL in the browser doesn't change to the correct location `https://www.friendsoffoxley.co.uk/trees/english-oak`
