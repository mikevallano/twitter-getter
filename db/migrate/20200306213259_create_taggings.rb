class CreateTaggings < ActiveRecord::Migration[6.0]
  def change
    create_table :taggings do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :liked_tweet, null: false, foreign_key: true

      t.timestamps
    end

    add_index :taggings, [:tag_id, :liked_tweet_id], unique: true
  end
end
