class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :movie, :user
end
