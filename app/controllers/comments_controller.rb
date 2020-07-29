class CommentsController < ApplicationController
    def index
        comments = Comment.all 
        render json: comments
    end

    def show
        movie = Comment.find(params[:id])
        render json: movie.to_json
    end

    def create
        #byebug
        comment = Comment.create(comment_params)
        render json: comment.to_json
    end

    def update

    end

    private
    def comment_params
        params.require(:comment).permit(:content, :movie_id, :user_id)
    end
end
