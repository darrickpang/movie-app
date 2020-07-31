class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :comments, :likes, :director, :title, :description, :year
end
