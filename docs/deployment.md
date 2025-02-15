# 🚀 Deployment

Deploying via 2 hosting services:

- PRODUCTION
  - [Firebase](https://firebase.google.com/products-release?authuser=0&hl=en) ([Free Spark Tier](https://firebase.google.com/pricing?authuser=0&hl=en))
  - Deploys to: <https://www.friendsoffoxley.co.uk/>
  - Hosting Project URL: <https://console.firebase.google.com/u/0/project/friends-of-foxley-prod/overview>
- Backup site
  - [Netlify](https://www.netlify.com/) ([free tier](https://www.netlify.com/pricing/))
  - Deploys to: <https://friends-of-foxley.netlify.app/>
  - Hosting Project URL: <https://app.netlify.com/sites/friends-of-foxley/overview/>

## Why 2 hosting providers?

- So that if there are issues in one hosting platform I can see if it's a universal issue or an issue specific to Firebase.
- If Firebase changes their plan or becomes too unstable I can easily switch-over to Netlify.
- Firebase has a limit on preview environments, you can have 3 max. This means I can use Netlify if I run out somehow. Normally I only need one at a time, and just need to delete old ones.
- Netlify generates a lighthouse report on deployment, so can see vital stats
- Netlify is optimised for Gatsby code deployments

## Deployment flows

On push:

- Netlify deployment triggered. If main to main env, else to preview env

On PR:

- Firebase channel deployment triggered

On merge:

- Firebase production deployment triggered

## Firebase channels (aka non-prod environments)

There are only 3 channels available, so if your PR changes aren't being deployed, then delete one of the 3 channels currently in use
