class MoviesController < ApplicationController
    def index
        movies = Movie.all 
        render json: MovieSerializer.new(movies)
    end

    def show
        movie = Movie.find(params[:id])
        render json: MovieSerializer.new(movie)
    end 

    def create

    end

    def update
        
    end
end

# def create
#     role = Role.find_or_create_by(name:params[:role])
#     @cat = Cat.create(
#         name: params[:name],
#         catchphrase: params[:catchphrase],
#         imgUrl: params[:imgUrl],
#         role: role
#     )
#     if @cat.valid?
#         render json: @cat
#     else
#         render json: {errors:@cat.full_message}, status:400
#     end 
# end 