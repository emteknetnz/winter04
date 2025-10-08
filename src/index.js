
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import InputForm from './components/InputForm';
import GrowthChart from './components/GrowthChart';
import { calculateProjection } from './lib/projectionLogic';

function App() {
	const [form, setForm] = useState({});
	const [projection, setProjection] = useState([]);

	const handleFormChange = (values) => {
		setForm(values);
		// Only calculate if all fields are present and valid
		const required = [
			'currentAge', 'retirementAge', 'currentSavings',
			'monthlyContribution', 'annualReturnRate', 'inflationRate', 'taxRate'
		];
		if (required.every((k) => values[k] !== undefined && values[k] !== '')) {
			// Convert percent fields to decimals
			const params = {
				...values,
				annualReturnRate: Number(values.annualReturnRate) / 100,
				inflationRate: Number(values.inflationRate) / 100,
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
				for (let month = 0; month < 12; month++) {
					balance += params.monthlyContribution;
				}
				balance *= 1 + ((1 + params.annualReturnRate) / (1 + params.inflationRate) - 1) * (1 - params.taxRate);
				data.push({ year: params.currentAge + year + 1, value: Math.round(balance) });
			}
			setProjection(data);
		} else {
			setProjection([]);
		}
	};

	return (
		<div style={{ background: '#222', color: '#fff', minHeight: '100vh', padding: 24 }}>
			<h1>Retirement Calculator</h1>
			<InputForm onChange={handleFormChange} />
			<div style={{ marginTop: 32 }}>
				{projection.length > 0 ? (
					<GrowthChart projectionData={projection} />
				) : (
					<p>Enter all parameters to see your projected retirement savings growth.</p>
				)}
			</div>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
