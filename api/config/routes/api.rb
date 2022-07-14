namespace :api do
  namespace :v1 do
    get '/users/me', to: 'users#me'
    
    resources :search, only: %i[index]
    resources :rating
    resources :recipes
    post '/comments', to: 'comment#create'


    scope :users, module: :users do
      # api/v1/users POST to register user
      post '/', to: 'registrations#create', as: :user_registration 
      # mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks]
    end
    post '/users/social_auth/callback', to: 'social#authenticate_social_auth_user'
    
    # namespace :andoid do 
    #   resources :recipes
    # end
  end
end

scope :api do
  scope :v1 do
    use_doorkeeper do 
      skip_controllers :authorizations, :applications, :authorized_applications
    end 
  end
end