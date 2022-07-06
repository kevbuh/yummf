class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id
  has_many :comments
end