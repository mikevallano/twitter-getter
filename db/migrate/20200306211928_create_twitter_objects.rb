class CreateTwitterObjects < ActiveRecord::Migration[6.0]
  def change
    create_table :twitter_objects do |t|
      t.bigint :tweet_id, index: true

      t.timestamps
    end
  end
end
