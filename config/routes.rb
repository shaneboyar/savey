Rails.application.routes.draw do
  resources :users, only: :create do
    collection do
      get 'confirm'
      post 'login', to: 'users#login'
    end
    resources :impulses
  end
end
