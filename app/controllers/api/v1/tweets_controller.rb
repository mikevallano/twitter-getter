class Api::V1::TweetsController < Api::V1::BaseController
  def index
    @tweets = LikedTweet.all

    render json: @tweets
  end
end
