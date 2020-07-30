class UsersController < ApplicationController
    def index
        users = User.all 
        render json: users
    end

    def create
        # byebug
        user = User.create(user_params)
        render json: user.to_json
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end
