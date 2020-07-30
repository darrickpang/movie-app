class AddBooleanToLikes < ActiveRecord::Migration[6.0]
  def change
    add_column :likes, :status, :boolean, null: false, default: false
  end
end
