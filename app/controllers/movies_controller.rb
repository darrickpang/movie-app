class MoviesController < ApplicationController
    def index
        movies = Movie.all 
        render json: movies.to_json
    end
end
