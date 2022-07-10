class Api::V1::RatingController < ApplicationController
  before_action :set_rating, only: %i[ show update destroy ]

  # GET /media
  def index
    @rating = Rating.all

    render json: @rating
  end

  # GET /media/1
  def show
    render json: @rating
  end

  # POST /rating
  def create
    @rating = Rating.new(rating_params)

    if @rating.save
      render json: @rating, status: :created, location: @v1_rating
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /media/1
  def update
    if @rating.update(rating_params)
      render json: @rating
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # DELETE /media/1
  def destroy
    @rating.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rating
      @rating = Rating.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def rating_params
      params.permit(:user_id, :recipe_id, :value)
    end
end
