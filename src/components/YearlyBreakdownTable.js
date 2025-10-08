import React from 'react';
import PropTypes from 'prop-types';

function formatDollar(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function YearlyBreakdownTable({ projectionData }) {
  return (
    <table className="yearly-breakdown-table" role="table" aria-label="Yearly Retirement Savings Breakdown">
      <thead>
        <tr>
          <th scope="col">Year</th>
          <th scope="col">Age</th>
          <th scope="col">Starting Balance</th>
          <th scope="col">Contribution</th>
          <th scope="col">Interest</th>
          <th scope="col">Inflation Adj.</th>
          <th scope="col">Tax Paid</th>
          <th scope="col">Ending Balance</th>
        </tr>
      </thead>
      <tbody>
        {projectionData.map((row, idx) => (
          <tr key={row.year}>
            <td>{row.year}</td>
            <td>{row.age}</td>
            <td>{formatDollar(row.startingBalance)}</td>
            <td>{formatDollar(row.contribution)}</td>
            <td>{formatDollar(row.interest)}</td>
            <td>{formatDollar(row.inflationAdjustment)}</td>
            <td>{formatDollar(row.taxPaid)}</td>
            <td>{formatDollar(row.endingBalance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

YearlyBreakdownTable.propTypes = {
  projectionData: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      age: PropTypes.number.isRequired,
      startingBalance: PropTypes.number.isRequired,
      contribution: PropTypes.number.isRequired,
      interest: PropTypes.number.isRequired,
      inflationAdjustment: PropTypes.number.isRequired,
      taxPaid: PropTypes.number.isRequired,
      endingBalance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default YearlyBreakdownTable;
