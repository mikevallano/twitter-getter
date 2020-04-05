class Api::V1::TaggingsController < Api::V1::BaseController
  def create
    taggings = CreateTaggingsOrchestratorService.call!(
      tag_names: tagging_parms[:tag_names],
      liked_tweet: tagging_parms[:liked_tweet]
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
    params.require(:tagging).permit(:tag_names, :liked_tweet)
  end
end
