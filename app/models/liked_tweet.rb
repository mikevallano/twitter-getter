class LikedTweet < ApplicationRecord
  belongs_to :user
  belongs_to :twitter_object
  has_many :taggings

  has_many :tags, through: :taggings
end
