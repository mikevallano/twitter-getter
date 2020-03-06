class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :liked_tweet
end
