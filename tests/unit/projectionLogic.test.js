import { calculateProjection } from '../../src/lib/projectionLogic';

describe('calculateProjection', () => {
  it('calculates correct projection with tax only', () => {
    const params = {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 10000,
      monthlyContribution: 500,
      annualReturnRate: 0.07,
      taxRate: 0.25,
    };
    const result = calculateProjection(params);
    expect(result).toHaveProperty('finalAmount');
    expect(result.finalAmount).toBeGreaterThan(params.currentSavings);
  });
});
