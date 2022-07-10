class Recipe < ApplicationRecord
  include PgSearch::Model
  belongs_to :user
  has_many :comments, dependent: :delete_all
  has_one_attached :featured_image


  pg_search_scope :search_by_term, against: %i[name caption],
    using: {
      tsearch: {
        any_word: true,
        prefix: true
      }
    }
end
