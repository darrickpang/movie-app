class LikesController < ApplicationController
    def index
        likes = Like.all 
        render json: likes
    end

    def show
        like = Like.find(params[:id])
        render json: like
    end

    def create
        # byebug
        like = Like.create(like_params)
        render json: like.to_json
    end

    private
    
    def like_params
        params.require(:like).permit(:movie_id, :user_id)
    end
end
