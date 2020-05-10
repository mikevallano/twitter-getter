class AddDeletedAtToLikedTweets < ActiveRecord::Migration[6.0]
  def up
    add_column :liked_tweets, :deleted_at, :datetime
    add_index :liked_tweets, :deleted_at
  end

  def down
    remove_index :liked_tweets, :deleted_at
    remove_column :liked_tweets, :deleted_at
  end
end
