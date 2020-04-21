class Api::V1::TweetsController < Api::V1::BaseController
  def index
    tag = Tag.find_by(name: params[:tag])

    tweets = if tag
      tag.liked_tweets.where(user: current_user).includes(:tags).first(5)
    else
      current_user.liked_tweets.includes(:tags).first(5)
    end

    render json: LikedTweetSerializer.new(tweets)
  end
end
