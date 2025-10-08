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
          <th scope="col">Age</th>
            <th scope="col">Balance</th>
          <th scope="col">Contribution</th>
          <th scope="col">Interest</th>
          {/* Inflation Adj. column removed */}
          <th scope="col">Tax Paid</th>
            {/* Ending Balance column removed, now shown as Balance */}
        </tr>
      </thead>
      <tbody>
        {projectionData.map((row, idx) => (
          <tr key={row.age}>
            <td>{row.age}</td>
              <td>{formatDollar(row.endingBalance)}</td>
            <td>{formatDollar(row.contribution)}</td>
            <td>{formatDollar(row.interest)}</td>
            {/* Inflation adjustment removed */}
            <td>{formatDollar(row.taxPaid)}</td>
              {/* Ending Balance column removed, now shown as Balance */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

YearlyBreakdownTable.propTypes = {
  projectionData: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.number.isRequired,
      contribution: PropTypes.number.isRequired,
      interest: PropTypes.number.isRequired,
      taxPaid: PropTypes.number.isRequired,
      endingBalance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default YearlyBreakdownTable;
