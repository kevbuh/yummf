class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :recipe_id, :user_id
  belongs_to :recipe
end
