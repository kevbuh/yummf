class Api::V1::SearchController < ApplicationController
  def index
    q = params[:q]
    render json: Recipe.search_by_term(q) 
    end
end