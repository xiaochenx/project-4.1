class Trip < ApplicationRecord
    validates :title, presence: :true
    validates :content, presence: :true
    validates :date, presence: :true

    belongs_to :user
end
