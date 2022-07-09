class RecipeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :featured_image, :name, :user_id, :cook_time, :directions, :caption, :rating, :secret, :serving, :url, :comments

  def featured_image
    if object.featured_image.attached?
      {
        url: rails_blob_url(object.featured_image, disposition: "attachment", only_path: true)
      }
    end
  end
end
