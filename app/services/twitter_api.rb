class TwitterApi
  attr_reader :client

  def initialize
    @client = Twitter::REST::Client.new do |config|
       config.consumer_key        = Rails.application.credentials.twitter_api_key
       config.consumer_secret     = Rails.application.credentials.twitter_api_secret
       config.access_token        = Rails.application.credentials.twitter_api_access_token
       config.access_token_secret = Rails.application.credentials.twitter_api_access_token_secret
    end
  end

  def get_favorites(username:, count: 200, since_id: nil, max_id: nil)
    client.favorites(username, count: count, since_id: since_id, max_id: max_id)
  end
end
