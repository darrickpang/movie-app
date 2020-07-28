class MoviesController < ApplicationController
    def index
        movies = Movie.all 
        render json: movies.to_json
    end

    def show
        movie = Movie.find(params[:id])
        render json: movie.to_json
    end 
end
