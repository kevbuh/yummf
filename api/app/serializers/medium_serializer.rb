class MediumSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :media_url, :alt_text, :media_type

   def media_url
    if object.media_url.attached?
      {
        url: rails_blob_url(object.media_url, disposition: "attachment", only_path: true)
      }
    end
  end

end
