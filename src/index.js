
import React, { useState } from 'react';
import './styles/base.scss';
import './styles/dark-theme.scss';
import ReactDOM from 'react-dom/client';
import InputForm from './components/InputForm';
import GrowthChart from './components/GrowthChart';
import { calculateProjection } from './lib/projectionLogic';

function App() {
		const [form, setForm] = useState({});
		const [projection, setProjection] = useState([]);
	const [darkTheme, setDarkTheme] = useState(true);

		React.useEffect(() => {
			if (darkTheme) {
				document.body.classList.add('dark-theme');
			} else {
				document.body.classList.remove('dark-theme');
			}
		}, [darkTheme]);

		const handleFormChange = (values) => {
			setForm(values);
			// Calculations are triggered automatically on input change
				const required = [
					'currentAge', 'retirementAge', 'currentSavings',
					'monthlyContribution', 'annualReturnRate', 'taxRate'
				];
			if (required.every((k) => values[k] !== undefined && values[k] !== '')) {
						// Convert percent fields to decimals
						const params = {
							...values,
							annualReturnRate: Number(values.annualReturnRate) / 100,
							taxRate: Number(values.taxRate) / 100,
							currentAge: Number(values.currentAge),
							retirementAge: Number(values.retirementAge),
							currentSavings: Number(values.currentSavings),
							monthlyContribution: Number(values.monthlyContribution),
						};
						const years = params.retirementAge - params.currentAge;
						let balance = params.currentSavings;
						const data = [];
						for (let year = 0; year < years; year++) {
							const startingBalance = balance;
							const contribution = params.monthlyContribution * 12;
							balance += contribution;
							const interest = balance * params.annualReturnRate;
							balance += interest;
							const taxPaid = interest * params.taxRate;
							balance -= taxPaid;
							const endingBalance = balance;
							data.push({
								year: params.currentAge + year + 1,
								age: params.currentAge + year + 1,
								startingBalance: Math.round(startingBalance),
								contribution: Math.round(contribution),
								interest: Math.round(interest),
								taxPaid: Math.round(taxPaid),
								endingBalance: Math.round(endingBalance),
							});
						}
						setProjection(data);
			} else {
				setProjection([]);
			}
		};

		return (
			<div style={{ minHeight: '100vh', padding: 24 }}>
				<h1>Retirement Calculator</h1>
				<button
					type="button"
					aria-label="Toggle dark theme"
					style={{ marginBottom: '1em' }}
					onClick={() => setDarkTheme((v) => !v)}
				>
					{darkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
				</button>
				<InputForm onChange={handleFormChange} />
				<div style={{ marginTop: 32 }}>
					{projection.length > 0 ? (
						<>
							<GrowthChart projectionData={projection.map(row => ({ year: row.year, value: row.endingBalance }))} />
							<div style={{ marginTop: 32 }}>
								{/* Table of yearly values below the chart */}
								{require('./components/YearlyBreakdownTable').default ? (
									React.createElement(require('./components/YearlyBreakdownTable').default, { projectionData: projection })
								) : null}
							</div>
						</>
					) : (
						<p>Enter all parameters to see your projected retirement savings growth.</p>
					)}
				</div>
			</div>
		);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
