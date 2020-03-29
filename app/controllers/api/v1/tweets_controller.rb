class Api::V1::TweetsController < Api::V1::BaseController
  def index
    @user = User.find_by(username: 'mikevallano') # need to set current_user
    @tweets = @user.liked_tweets.sample(5)

    render json: @tweets
  end
end
