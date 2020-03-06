ActiveRecord::Base.transaction do
  # Users

  5.times do |i|
    User.create(
      email: "user#{i+1}@example.com",
      password: "Password8"
    )
  end

  puts "Users created: #{User.count}"

  # Twitter Objects
  TwitterObject.create(
    [
      {tweet_id: '1234452353996161028'},
      {tweet_id: '1233544464783814657'},
      {tweet_id: '1232613076630953984'},
      {tweet_id: '1231208173597548546'},
      {tweet_id: '1230476629861900288'}
    ]
  )

  puts "TwitterObjects created: #{TwitterObject.count}"

  # Liked Tweets
  10.times do
    LikedTweet.create(
      user: User.all.sample,
      twitter_object: TwitterObject.all.sample
    )
  end

  puts "LikedTweets created: #{LikedTweet.count}"

  # Tags
  10.times do |i|
    Tag.create(name: "tag#{i+1}")
  end

  puts "Tags created: #{Tag.count}"

  # Taggings
  10.times do
    Tagging.find_or_create_by(
      tag: Tag.all.sample,
      liked_tweet: LikedTweet.all.sample
    )
  end

  puts "Taggings created: #{Tagging.count}"
end
