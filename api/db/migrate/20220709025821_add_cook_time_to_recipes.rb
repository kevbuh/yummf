class AddCookTimeToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :cook_time, :string
    add_column :recipes, :rating, :integer
    add_column :recipes, :num_saves, :integer
  end
end
