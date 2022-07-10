class Recipe < ApplicationRecord
  include PgSearch::Model
  belongs_to :user
  has_many :comments, dependent: :delete_all
  has_one_attached :featured_image
  has_many :ratings, dependent: :delete_all

  def past_hour_average
  ratings = self.ratings.order(:created_at)
  if ratings.count > 0 
    this_rating = (ratings.sum(:value).to_f / ratings.count.to_f ).to_f
  else 
    this_rating = nil
  end
  this_rating
end


  pg_search_scope :search_by_term, against: %i[name caption],
    using: {
      tsearch: {
        any_word: true,
        prefix: true
      }
    }
end
