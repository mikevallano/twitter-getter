class LikedTweet < ApplicationRecord
  belongs_to :user
  has_many :taggings
  has_many :tags, through: :taggings

  scope :ordered, -> { order(tweet_id: :desc) }
end
