class AddCaptionToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :caption, :string
    add_column :recipes, :directions, :string
    add_column :recipes, :secret, :boolean
  end
end
