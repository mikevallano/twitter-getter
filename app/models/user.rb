class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, and :trackable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[twitter]

  has_many :liked_tweets

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user| # TODO check what provider returns
      user.email = auth.info.email || '' # to bypass not null constraint on the db
      user.password = Devise.friendly_token[0, 20]
      user.username = auth.info.nickname

      # image, etc.

      # user.skip_confirmation! # if using confirmable
    end
  end

  def email_required?
    false # some twitter users won't have an email. should probably distinguish twitter auth users. TODO
  end

  def most_recently_liked_tweet_id
    liked_tweets.ordered.first&.tweet_id
  end
end
