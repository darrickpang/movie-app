class User < ApplicationRecord
    has_many :comments
    has_many :likes
    has_many :movies, through: :likes
    has_many :movies, through: :comments
end
