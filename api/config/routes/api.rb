namespace :api do
  namespace :v1 do
    get '/users/me', to: 'users#me'
    
    resources :search, only: %i[index]

    scope :users, module: :users do
      # api/v1/users POST to register user
      post '/', to: 'registrations#create', as: :user_registration 
    end
    resources :recipes

    namespace :andoid do 
      resources :recipes
    end
  end
end

scope :api do
  scope :v1 do
    use_doorkeeper do 
      skip_controllers :authorizations, :applications, :authorized_applications
    end 
  end
end