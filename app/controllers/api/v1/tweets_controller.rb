class Api::V1::TweetsController < Api::V1::BaseController
  def index
    tweets = current_user.liked_tweets.includes(:tags).sample(5)

    render json: LikedTweetSerializer.new(tweets)
  end
end
