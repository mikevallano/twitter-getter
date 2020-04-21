class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :liked_tweet

  validates :tag, presence: true
  validates :liked_tweet, presence: true
  validates :tag, uniqueness: { scope: :liked_tweet }
end
