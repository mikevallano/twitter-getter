class CreateTaggingsOrchestratorService

  def self.call!(
    tag_names: tag_names,
    liked_tweet_id: liked_tweet_id
  )
    liked_tweet = LikedTweet.find_by!(tweet_id: liked_tweet_id)
    tags = CreateTagsService.new(tag_names).create_tags!

    CreateTaggingsService.new(tags, liked_tweet).create_taggings!
  end

end
