# yummf

```Yummf.com frontend still works, but backend does not work due to the shutting down of free Heroku instances :(```

What is Yummf? (Formally called Kooki, hence the repository name):

- A recipe recommendation feed with a community discussion forum

Notes
I rewrote this project three times, once in Django, Ruby on Rails, and finally TypeScript/NextJS (web_v3 folder).
Deployed a PostgreSQL database on Digital Ocean, and implemented Amazon S3 for all media storage.
100 lighthouse score for SEO and 95+ lighthouse performance score on all pages.
Implemented a clean design with TailwindCSS.

Django implementation is at https://github.com/kevbuh/cookbook

Feel free to add your recipes, the site needs it!

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
