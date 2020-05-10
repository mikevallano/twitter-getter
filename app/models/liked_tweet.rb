class LikedTweet < ApplicationRecord
  belongs_to :user
  has_many :taggings
  has_many :tags, through: :taggings

  scope :ordered, -> { order(tweet_id: :desc) }
  scope :deleted, -> (bool) { bool ? where.not(deleted_at: nil) : where(deleted_at: nil) }
end
