class CreateLikedTweets < ActiveRecord::Migration[6.0]
  def change
    create_table :liked_tweets do |t|
      t.references :user, null: false, foreign_key: true
      t.references :twitter_object, null: false, foreign_key: true

      t.timestamps
    end
  end
end
