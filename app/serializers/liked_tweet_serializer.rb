class LikedTweetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id

  attribute :tweet_id do |liked_tweet|
    liked_tweet.tweet_id.to_s
  end

  attribute :taggings do |liked_tweet|
    liked_tweet.taggings.map do |tagging|
      tagging.serializable_hash(except: %i[created_at updated_at]).merge(tag_name: tagging.tag.name)
    end
  end

  attribute :tags do |liked_tweet|
    liked_tweet.tags.map do |tag|
      tag.serializable_hash(except: %i[created_at updated_at])
    end
  end
end
