Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root 'pages#home'
  get 'tweets', to: 'pages#tweets'

  namespace :api do
    namespace :v1 do
      resources :tweets, only: %i[index show create destroy]
      resources :taggings, only: %i[index create destroy]
      get 'tag_counts', to: 'taggings#tag_counts'
    end
  end
end
