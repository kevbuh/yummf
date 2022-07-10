class Api::V1::RecipesController < ApplicationController

  
  before_action :set_recipe, only: %i[ show update destroy ]

  def search
    @recipes = Recipes.search_by_term(params[:query])

    render json: @recipes
  end

  # GET /recipes
  # @recipes = Recipe.page(params[:page] ? params[:page].to_i : 1)            
  # render json: {objects:@recipes, meta:pagination_meta(@recipes) }
  # @recipes = Recipe.all
  def index
    require 'pagination'
    @recipes = Recipe.page(params[:page] ? params[:page].to_i : 1)            
    
    render json: Pagination.build_json(@recipes)
  end
  

  
  # GET /recipes/1
  def show
    render json: @recipe
  end

  # POST /recipes
  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      render json: @recipe, status: :created, location: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recipes/1
  def update
    if @recipe.update(recipe_params)
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /recipes/1
  def destroy
    @recipe.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def recipe_params
      params.permit(:name, :user_id, :cook_time, :directions, :caption, :rating, :secret, :serving, :url)
    end

    def pagination_meta(object) {        
      current_page: object.current_page,        
      next_page: object.next_page,        
      prev_page: object.prev_page,        
      total_pages: object.total_pages,        
      total_count: object.total_count       
     }    
    end
end
