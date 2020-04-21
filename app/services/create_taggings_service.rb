class CreateTaggingsService
  def initialize(tags, liked_tweet)
    @tags = tags
    @liked_tweet = liked_tweet
  end

  def create_taggings!
    @tags.map do |tag|
      Tagging.find_or_create_by!(tag: tag, liked_tweet: @liked_tweet)
    end
  end
end
