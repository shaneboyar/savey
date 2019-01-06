class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def get_jwt_from_cookie
    headers['Cookie'].split("jwt=").pop()
  end

  def user
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    get_jwt_from_cookie
    if headers['Cookie'].present?
      return get_jwt_from_cookie
    else errors.add(:token, 'Missing token')
    end
    nil
  end
end