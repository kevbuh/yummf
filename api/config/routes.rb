Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  use_doorkeeper
  devise_for :users
  resources :recipes
  
  # check routes/api.rb
  draw :api
  
  # Defines the root path route ("/")
  # resources :media
  # root "articles#index"
end
