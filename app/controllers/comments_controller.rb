class CommentsController < ApplicationController
    def index
        movies = Comment.all 
        render json: movies.to_json
    end

    def show
        movie = Comment.find(params[:id])
        render json: movie.to_json
    end
    
    def new
        comment = Comment.new
    end

    def create
       comment = Comment.new(comment_params)
       render json: comment.to_json
    end

    def update

    end

    def edit

    end

    private
    def comment_params
        params.require(:comment).permit(:content, :movie_id, user_id)
    end
end
