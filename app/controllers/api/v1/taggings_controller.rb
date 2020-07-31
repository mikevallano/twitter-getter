class Api::V1::TaggingsController < Api::V1::BaseController
  def index
    liked_tweet = LikedTweet.find_by!(tweet_id: params[:tweet_id])
    taggings = liked_tweet.taggings
    render json: TaggingSerializer.new(taggings)
  end

  def create
    taggings = CreateTaggingsOrchestratorService.call!(
      tag_names: tagging_params[:tag_names],
      liked_tweet_id: tagging_params[:liked_tweet_id]
    )
    render json: TaggingSerializer.new(taggings)
    # handle error
  end

  def destroy
    tagging = Tagging.find_by(id: params[:id])
    if tagging.liked_tweet.user == current_user && tagging.destroy!
      render body: nil, status: :no_content # https://stackoverflow.com/a/33805840
    else
      render json: {error: 'Could not destroy'}
    end
  end

  def tag_counts
    tag_names = current_user.tags.group(:name).order(count_all: :desc).count.keys
    render json: {data: tag_names}
  end

  private
  # build this out more
  def tagging_params
    params.require(:tagging).permit(:tag_names, :liked_tweet_id)
  end
end
