Rails.application.routes.draw do
  resources :users, only: :create do
    collection do
      get 'confirm'
      post 'login' => 'user_token#create'
    end
    resources :impulses
  end
end
