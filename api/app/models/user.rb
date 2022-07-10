class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :recipes, dependent: :delete_all
  has_many :comments, dependent: :delete_all
  has_many :ratings, dependent: :delete_all

  validates :email, format: URI::MailTo::EMAIL_REGEXP
  enum role: %i[user admin]

  def self.authenticate(email, password)
    user = User.find_for_authentication(email:email)
    user&.valid_password?(password) ? user : nil
  end
end
