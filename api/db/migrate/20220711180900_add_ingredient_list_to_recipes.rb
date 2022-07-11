class AddIngredientListToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :ingredient_list, :text, array: true, default: []
  end
end
