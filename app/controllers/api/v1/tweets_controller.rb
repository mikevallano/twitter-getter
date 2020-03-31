class Api::V1::TweetsController < Api::V1::BaseController
  def index
    tweet_ids = current_user.liked_tweets.sample(5).pluck(:tweet_id).map(&:to_s)

    render json: {tweet_ids: tweet_ids, user_id: current_user.id}
  end
end
