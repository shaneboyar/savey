class UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token
  before_action :require_confirmation, only: [:create]

  private

  def require_confirmation
    user = User.find_by(email: params[:auth][:email])
    if !user.confirmed_at?
      render json: {error: 'Email not verified' }, status: :unauthorized
    end
  end
end
