class Api::V1::TweetsController < Api::V1::BaseController
  def index
    tag = Tag.find_by(name: params[:tag])

    tweets = if tag
      tag.liked_tweets.where(user: current_user).includes(:tags).ordered.first(25)
    else
      current_user.liked_tweets.includes(:tags).ordered.first(25)
    end

    render json: LikedTweetSerializer.new(tweets)
  end

  def create
    LikedTweetPopulator.new(user: current_user).fetch_recently_liked_tweets
  end
end
