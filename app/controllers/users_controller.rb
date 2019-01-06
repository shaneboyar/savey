class UsersController < ApplicationController
  skip_before_action :authenticate_request

  def create
    user = User.new(user_params)
  
    if user.save
      # TODO: Invoke send email method here
      render json: {status: 'User created successfully'}, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  def confirm
    token = params[:token].to_s
  
    user = User.find_by(confirmation_token: token)
  
    if user.present? && user.confirmation_token_valid?
      user.mark_as_confirmed!
      render json: {status: 'User confirmed successfully'}, status: :ok
    else
      render json: {status: 'Invalid token'}, status: :not_found
    end
  end

  def login
    authenticate params[:email], params[:password]
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def authenticate(email, password)
    command = AuthenticateUser.call(email, password)

    if command.success?
      render json: {
        access_token: command.result,
        message: 'Login Successful'
      }
      cookies[:jwt] = {value: command.result, httponly: true, expires: 1.day.from_now }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
end
