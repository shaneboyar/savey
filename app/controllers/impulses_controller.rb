class ImpulsesController < ApplicationController
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

  def create
    user = User.find_by(id: params[:user_id])
    if user != current_user
      render json: {errors: ["You cannot access another users data"]}, status: :unauthorized
    else
      @impulse = Impulse.new(
        name: params[:name],
        price: params[:price],
        remind_at: params[:remind_at],
        user: user
      )
      if @impulse.save
        render json: {impulses: @current_user.impulses}, status: :created
      else
        render json: {errors: @impulse.errors}, status: :unprocessable_entity
      end
    end
  end

  private
  
  def impulse_params
    params.require(:impulse).permit(:name, :price, :remind_at)
  end
end
