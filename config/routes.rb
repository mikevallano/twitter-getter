Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root 'pages#home'
  get 'tweets', to: 'pages#tweets'

  namespace :api do
    namespace :v1 do
      resources :tweets, only: :index
      resources :taggings, only: %i[create destroy]
    end
  end
end
