class Tag < ApplicationRecord
  has_many :taggings
  has_many :liked_tweets, through: :taggings
end
