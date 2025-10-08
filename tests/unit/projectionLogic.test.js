import { calculateProjection } from '../../src/lib/projectionLogic';

describe('calculateProjection', () => {
  it('calculates correct projection with inflation and tax', () => {
    const params = {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 10000,
      monthlyContribution: 500,
      annualReturnRate: 0.07,
      inflationRate: 0.02,
      taxRate: 0.25,
    };
    const result = calculateProjection(params);
    expect(result).toHaveProperty('finalAmount');
    expect(result.finalAmount).toBeGreaterThan(params.currentSavings);
  });

  it('uses Fisher equation for real return', () => {
    const params = {
      currentAge: 40,
      retirementAge: 60,
      currentSavings: 20000,
      monthlyContribution: 300,
      annualReturnRate: 0.05,
      inflationRate: 0.03,
      taxRate: 0.2,
    };
    const result = calculateProjection(params);
    // Real return = (1 + nominal) / (1 + inflation) - 1
    const expectedRealReturn = (1 + params.annualReturnRate) / (1 + params.inflationRate) - 1;
    expect(result.realReturn).toBeCloseTo(expectedRealReturn, 4);
  });
});
