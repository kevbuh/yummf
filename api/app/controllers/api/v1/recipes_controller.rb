class Api::V1::RecipesController < ApplicationController
  include Pagination
  before_action :set_recipe, only: %i[ show update destroy ]


  def search
    @recipes = Recipes.search_by_term(params[:query])

    render json: @recipes
  end

  # GET /recipes
  # def index
  #   @recipes = Recipe.all

  #   render json: @recipes
  # end

  def index
        render json: pages(records: records, url: api_v1_recipes_path),
               except: [:updated_at],
               status: :ok
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
      params.permit(:name, :user_id, :cook_time, :directions, :caption, :rating, :secret, :serving, :url, :featured_image)
    end

    def records
          Recipe.with_attached_featured_image
        end
end
