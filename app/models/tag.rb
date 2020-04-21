class Tag < ApplicationRecord
  has_many :taggings
  has_many :liked_tweets, through: :taggings

  validates :name, presence: true
  validates :name, uniqueness: true
end
