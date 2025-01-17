class FundingCalculator
  def initialize(startup_valuation, equity_offered)
    @startup_valuation = startup_valuation
    @equity_offered = equity_offered
  end

  def calculate_funding
    (@startup_valuation * @equity_offered / 100).round(2)
  end
end

# This class can be used in a Ruby on Rails API that your Next.js app calls

