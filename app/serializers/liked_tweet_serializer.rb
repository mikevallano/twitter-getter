class LikedTweetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id

  attribute :tweet_id do |obj|
    obj.tweet_id.to_s
  end
end
