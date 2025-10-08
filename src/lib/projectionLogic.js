// Retirement projection logic
export function calculateProjection({
  currentAge,
  retirementAge,
  currentSavings,
  monthlyContribution,
  annualReturnRate,
  taxRate,
}) {
  // Convert percent rates to decimals if needed
  const nominal = annualReturnRate;
  const tax = taxRate;
  const years = retirementAge - currentAge;
  let balance = currentSavings;
  for (let year = 0; year < years; year++) {
    for (let month = 0; month < 12; month++) {
      balance += monthlyContribution;
    }
    const interest = balance * nominal;
    balance += interest;
    const taxPaid = interest * tax;
    balance -= taxPaid;
  }
  return {
    finalAmount: Math.round(balance),
    years,
  };
}
