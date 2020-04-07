class Api::V1::TaggingsController < Api::V1::BaseController
  def create
    taggings = CreateTaggingsOrchestratorService.call!(
      tag_names: tagging_params[:tag_names],
      liked_tweet_id: tagging_params[:liked_tweet_id]
    )
    render json: TaggingSerializer.new(taggings)
    # handle error
  end

  def destroy
    @tagging = Tagging.find_by(id: params[:id])
    if @tagging.liked_tweet.user == current_user && @tagging.destroy!
      render json: 'success'
    else
      render json: {error: 'Could not destroy'}
    end
  end

  private
  # build this out more
  def tagging_params
    params.require(:tagging).permit(:tag_names, :liked_tweet_id)
  end
end
