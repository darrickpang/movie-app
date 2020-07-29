class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :comments, :director, :title, :description, :year
end
