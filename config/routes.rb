Rails.application.routes.draw do
  resources :comments
  resources :likes
  resources :movies, only: [:index, :show]
  resources :users, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
