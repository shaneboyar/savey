class ImpulsesController < ApplicationController
  before_action :authenticate_user

  def index
    user = User.find_by(id: params[:user_id])
    if !user
      render json: {errors: ["User not found"]}, status: :unprocessable_entity 
    elsif user != current_user
      render json: {errors: ["You cannot access another users data"]}, status: :unauthorized
    else
      render json: {impulses: user.impulses}, status: :ok
    end
  end
end
