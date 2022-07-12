require 'json'
class Api::V1::SocialController < ApplicationController
  # protect_from_forgery with: :null_session
  # skip_before_action :verify_authenticity_token
  def authenticate_social_auth_user
    @user = User.signin_or_create_from_provider(params)

    if @user.persisted?
      sign_in(@user)

      # login_token = @user.create_new_auth_token
      render json: {
        status: 'SUCCESS GOOGLE LOGIN',
        message: 'User was successfully logged in through google provider',
        data: {
          user: @user,
          # pswrd: @user.password
        }
      }, status: :created
    else
      render json: {
        status: 'FAILED GOOGLE LOGIN',
        message: 'User was not successfully logged in through google provider',
        data: @user.errors
        }, status: :unprocessable_entity
    end
  end
end