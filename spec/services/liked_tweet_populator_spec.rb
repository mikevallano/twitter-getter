require 'rails_helper'

RSpec.describe LikedTweetPopulator, type: :service do

  let(:tester) { 'test' }

  context 'with a logged in user' do
    it 'does stuff' do
      expect(2 + 2).to eq(4)
    end
  end
end
