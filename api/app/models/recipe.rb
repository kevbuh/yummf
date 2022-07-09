class Recipe < ApplicationRecord
  include PgSearch
  belongs_to :user
  has_many :comments, dependent: :delete_all

  pg_search_scope :search_by_term, against: %i[name caption],
    using: {
      tsearch: {
        any_word: true,
        prefix: true
      }
    }
end
