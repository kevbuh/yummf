class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private
  def respond_with(resource, _opts = {})
    # determines whether to respond to success or failure
    register_success && return if resource.persisted?
    
    # else it goes to this
    register_failed
  end

  def register_success
    render json: {
      message: 'Signed up successfully!',
      user: current_user
    }, status: :ok
  end

  def register_failed
    render json: {message: 'Something went wrong while signing up user'}, status: :unprocessable_entity
  end
end