class AddJsonbToRecipesIngredientList < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :ingredient_list, :jsonb, default: {}
  end
end
