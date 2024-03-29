# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#for production 
if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create(name: "NextJS Client", redirect_uri: "", scopes: ["read", "write"])
end

User.first_or_create(email: 'dean@example.com', password: 'password', password_confirmation: "password", role: User.roles[:admin])