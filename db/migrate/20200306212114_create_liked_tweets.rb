class CreateLikedTweets < ActiveRecord::Migration[6.0]
  def change
    create_table :liked_tweets do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.bigint :tweet_id, null: false, index: true

      t.timestamps
    end

    add_index :liked_tweets, [:user_id, :tweet_id], unique: true
  end
end
