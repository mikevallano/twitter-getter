class TaggingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :tag_id, :liked_tweet_id

  attribute :tag_name do |object|
    object.tag.name
  end
end
