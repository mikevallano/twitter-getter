ActiveRecord::Base.transaction do
  ## Users
  5.times do |i|
    User.create(
      email: "user#{i+1}@example.com",
      password: "Password8"
    )
  end

  puts "Users created: #{User.count}"

  ## Liked Tweets
  tweet_ids = [
    '1234452353996161028',
    '1233544464783814657',
    '1232613076630953984',
    '1231208173597548546',
    '1230476629861900288'
  ]
  user_ids = User.all.pluck(:id)
  liked_tweet_objects = Array.new(10) do
    {
      user_id: user_ids.sample,
      tweet_id: tweet_ids.sample,
      created_at: Time.current,
      updated_at: Time.current
    }
  end

  LikedTweet.insert_all(liked_tweet_objects)

  puts "LikedTweets created: #{LikedTweet.count}"

  ## Tags
  10.times do |i|
    Tag.create(name: "tag#{i+1}")
  end

  puts "Tags created: #{Tag.count}"

  ## Taggings
  10.times do
    Tagging.find_or_create_by(
      tag: Tag.all.sample,
      liked_tweet: LikedTweet.all.sample
    )
  end

  puts "Taggings created: #{Tagging.count}"
end
