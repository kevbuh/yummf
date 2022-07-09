class AddUrlToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :url, :string
    add_column :recipes, :serving, :string
  end
end
