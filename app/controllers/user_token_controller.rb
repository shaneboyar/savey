class UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token
  before_action :require_confirmation, only: [:create]
  after_action :store_jwt_in_cookie, only: [:create]

  private

  def store_jwt_in_cookie
    jwt = JSON.parse(response.body)["jwt"]
    cookies[:jwt] = {value:  jwt, expires: 1.day.from_now}
  end

  def require_confirmation
    user = User.find_by(email: params[:auth][:email])
    if !user.confirmed_at?
      render json: {error: 'Email not verified' }, status: :unauthorized
    end
  end
end
