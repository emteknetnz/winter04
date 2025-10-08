import React from 'react';
import PropTypes from 'prop-types';

function YearlyBreakdownTable({ projectionData }) {
  return (
    <table className="yearly-breakdown-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Age</th>
          <th>Starting Balance</th>
          <th>Contribution</th>
          <th>Interest</th>
          <th>Inflation Adj.</th>
          <th>Tax Paid</th>
          <th>Ending Balance</th>
        </tr>
      </thead>
      <tbody>
        {projectionData.map((row, idx) => (
          <tr key={row.year}>
            <td>{row.year}</td>
            <td>{row.age}</td>
            <td>{row.startingBalance.toLocaleString()}</td>
            <td>{row.contribution.toLocaleString()}</td>
            <td>{row.interest.toLocaleString()}</td>
            <td>{row.inflationAdjustment.toLocaleString()}</td>
            <td>{row.taxPaid.toLocaleString()}</td>
            <td>{row.endingBalance.toLocaleString()}</td>
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
