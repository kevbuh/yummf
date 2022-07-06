# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

Kevin Notes:

1. Create project -> rails new --api --database postgresql api
2. Scaffold a model -> rails g scaffold Recipe name:string
3. Go to gemfile and uncomment rack-cors and go to config cors and add allowed cor origins
4. rake db:create -> creates a test and dev database
5. then migrate using rails db:migrate
6. generate a model -> rails g model Comment recipe:references text:string
7. then migrate using rails db:migrate
8. rails c to go into ruby cli and create some model instances
9. rails s to start server
10. Get the active model serializer to serialize json

rails s -p <your_port> -> start rails on another port other than 3000

https://www.scien.cx/2021/07/25/react-rails-authentication-api-with-devise-and-devise-jwtback-end-part/?printer_app=1

https://www.youtube.com/watch?v=PqizV5l1yFE&t=1337s

visit here to see all router: /rails/info/routes
