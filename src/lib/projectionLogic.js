// Retirement projection logic
export function calculateProjection({
  currentAge,
  retirementAge,
  currentSavings,
  monthlyContribution,
  annualReturnRate,
  inflationRate,
  taxRate,
}) {
  // Convert percent rates to decimals if needed
  const nominal = annualReturnRate;
  const inflation = inflationRate;
  const tax = taxRate;
  const years = retirementAge - currentAge;
  // Fisher equation for real return
  const realReturn = (1 + nominal) / (1 + inflation) - 1;
  let balance = currentSavings;
  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      balance += monthlyContribution;
    }
    balance *= 1 + realReturn * (1 - tax);
  }
  return {
    finalAmount: Math.round(balance),
    realReturn,
    years,
  };
}
