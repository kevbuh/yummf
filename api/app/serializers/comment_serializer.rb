class CommentSerialier < ActiveModel::Serializer 
  attributes :id, :text, 
  belongs_to :recipe
end