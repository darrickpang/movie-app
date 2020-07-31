class CommentsController < ApplicationController
    def index
        comments = Comment.all 
        render json: comments
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment.to_json
    end

    def create
        # byebug
        comment = Comment.create(comment_params)
        render json: comment.to_json
    end

    def edit
        comment = Comment.find(params[:id])
    end

    def update
        comment = Comment.find(params[:id])
        comment.update(comment_params)
    end

    def destroy
        comment = Comment.find(params[:id]).destroy
    end

    private
    def comment_params
        params.require(:comment).permit(:content, :movie_id, :user_id)
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