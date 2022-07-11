class RecipeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :user_id, :cook_time, :directions, :caption, :secret, :serving, :url, :featured_image, :comments, :past_hour_average, :ingredient_list

  def featured_image
    if object.featured_image.attached?
      {
        url: polymorphic_url(object.featured_image, only_path: true)
      }
    end
  end
end
