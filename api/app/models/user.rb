class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

        #  include DeviseTokenAuth::Concerns::User

  has_many :recipes, dependent: :delete_all
  has_many :comments, dependent: :delete_all
  has_many :ratings, dependent: :delete_all

  # include DeviseTokenAuth::Concerns::User

  validates :email, format: URI::MailTo::EMAIL_REGEXP
  enum role: %i[user admin]

  def self.authenticate(email, password)
    user = User.find_for_authentication(email:email)
    user&.valid_password?(password) ? user : nil
  end

  def self.signin_or_create_from_provider(provider_data)
    where(provider: provider_data[:provider], uid: provider_data[:uid]).first_or_create do |user|
      user.email = provider_data[:info][:email]
      user.password = Devise.friendly_token[0,20]
      # user.skip_confirmation!
    end
  end
end
