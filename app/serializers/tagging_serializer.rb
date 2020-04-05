class TaggingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :tag_id, :liked_tweet_id
end
