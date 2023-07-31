# yummf 

- Yummf is a recipe recommendation feed with a community discussion forum.
- Frontend still works, but backend doesn't due to the shutting down of free Heroku instances :(

### Notes:
I rewrote this project three times, once in Django, Ruby on Rails, and finally TypeScript/NextJS (web_v3 folder).
Deployed a PostgreSQL database on Digital Ocean, and implemented Amazon S3 for all media storage.
100 lighthouse score for SEO and 95+ lighthouse performance score on all pages.
Implemented a clean design with TailwindCSS.

### Versions
- Django version: https://github.com/kevbuh/cookbook

- Ruby On Rails: https://github.com/kevbuh/yummf/tree/main/api

- NextJS version: https://github.com/kevbuh/yummf/tree/main/web_v3

### Goals met
- Deployed Rails API to Fly.io instance and created a Postgres database cluster using a docker image
- Implemented Google Oauth2 for one-tap sign-ins and account creation and Mixpanel analytics
- Configured cursor pagination in SQL for infinite scroll and Stripe subscription to process subscriptions
- Used JWT tokens to verify all requests to a custom-built REST API in Ruby on Rails using Doorkeeper and Devise

Design influences:

- Airbnb
- Digital Ocean
- Beacons.ai
- Rarible
- Posthog

Better recipe SEO:

- https://developers.google.com/search/docs/advanced/structured-data/recipe
