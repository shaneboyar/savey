# == Schema Information
#
# Table name: impulses
#
#  id         :integer          not null, primary key
#  name       :string
#  price      :decimal(, )
#  remind_at  :datetime
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Impulse < ApplicationRecord
  belongs_to :user
end
