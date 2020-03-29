class LikedTweetPopulator
  attr_reader :user
  def initialize(user:)
    @user = user
  end

  def fetch_recently_liked_tweets
    returned_tweets = TwitterApi.new.get_favorites(
      username: user.username,
      since_id: user.most_recently_liked_tweet_id || '1'
    )
    created_liked_tweets(tweet_ids: returned_tweets.map{|obj| obj.id}) if returned_tweets.any? #?
  end

  def created_liked_tweets(tweet_ids:)
    user_id = user.id
    liked_tweet_data = tweet_ids.map do |tweet_id|
      { user_id: user_id,
        tweet_id: tweet_id,
        created_at: Time.current,
        updated_at: Time.current
      }
    end
    LikedTweet.insert_all(liked_tweet_data)
  end
end
