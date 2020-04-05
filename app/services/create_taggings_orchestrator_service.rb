class CreateTaggingsOrchestratorService

  def self.call!(
    tag_names: tag_names,
    liked_tweet: liked_tweet
  )
    tags = CreateTagsService.new(tag_names).create_tags!

    CreateTaggingsService.new(tags, liked_tweet).create_taggings!
  end

end
