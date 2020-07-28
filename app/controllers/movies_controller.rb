class MoviesController < ApplicationController
    def index
        @movies = Movie.all 
        render json
    end
end
