class Api::V1::TweetsController < Api::V1::BaseController
  DEFAULT_LIMIT = 10

  def index
    tweets = if params[:tag].present?
      tag = Tag.find_by(name: params[:tag])
      tag.liked_tweets.where(user: current_user).includes(:tags).ordered
    else
      current_user.liked_tweets.includes(:tags).ordered
    end

    total_count = tweets.size
    page = params[:page].present? ? params[:page].to_i : 1
    total_pages = (total_count/DEFAULT_LIMIT) + 1
    offset = (page * DEFAULT_LIMIT) - DEFAULT_LIMIT
    has_more = page < total_pages
    limited_tweets = tweets.limit(DEFAULT_LIMIT).offset(offset)

    count = limited_tweets.size
    count_data = {limit: DEFAULT_LIMIT, count: count, page: page, total_pages: total_pages, has_more: has_more}


    render json: count_data.merge(LikedTweetSerializer.new(limited_tweets))
  end

  def show
    tweet = current_user.liked_tweets.find_by(id: params[:id])
    render json: LikedTweetSerializer.new(tweet)
  end

  def create
    LikedTweetPopulator.new(user: current_user).fetch_recently_liked_tweets
  end
end
