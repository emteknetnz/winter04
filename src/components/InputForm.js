import React, { useState } from 'react';

export const fields = [
  { label: 'Current Age', name: 'currentAge', type: 'number', min: 0 },
  { label: 'Retirement Age', name: 'retirementAge', type: 'number', min: 0 },
  { label: 'Current Savings', name: 'currentSavings', type: 'number', min: 0 },
  { label: 'Monthly Contributions', name: 'monthlyContribution', type: 'number', min: 0 },
  { label: 'Annual Return Rate (%)', name: 'annualReturnRate', type: 'number', min: 0, max: 100 },
  { label: 'Inflation Rate (%)', name: 'inflationRate', type: 'number', min: 0, max: 100 },
  { label: 'Tax Rate (%)', name: 'taxRate', type: 'number', min: 0, max: 100 },
];

function validate(name, value) {
  if (value === '') {
    return 'Invalid ' + name.replace(/([A-Z])/g, ' $1').toLowerCase();
  }
  if (isNaN(Number(value))) {
    return 'Invalid ' + name.replace(/([A-Z])/g, ' $1').toLowerCase();
  }
  if (Number(value) < 0) return name + ' must be positive';
  if ((name === 'annualReturnRate' || name === 'inflationRate' || name === 'taxRate') && (Number(value) < 0 || Number(value) > 100)) return name + ' must be 0-100';
  return '';
}

export default function InputForm({ onChange }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const sampleValues = {
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 500,
    annualReturnRate: 6.5,
    inflationRate: 2.5,
    taxRate: 20,
  };

  const fillSampleData = () => {
    setValues(sampleValues);
    // Validate all fields
    const newErrors = {};
    for (const key in sampleValues) {
      newErrors[key] = validate(key, sampleValues[key]);
    }
    setErrors(newErrors);
    if (onChange) onChange(sampleValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: error });
    if (onChange) onChange({ ...values, [name]: value });
  };

  return (
  <form>
      {fields.map(f => (
        <div key={f.name}>
          <label htmlFor={f.name}>{f.label}</label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            min={f.min}
            max={f.max}
            value={values[f.name] !== undefined ? values[f.name] : ''}
            onChange={handleChange}
            aria-label={f.label}
            inputMode={f.type === 'number' ? 'decimal' : undefined}
          />
          {errors[f.name] && (
            <span style={{ color: 'red' }} data-testid={`error-${f.name}`}>
              {errors[f.name].toLowerCase().includes('invalid') ? `invalid ${f.label.toLowerCase()}` : errors[f.name]}
            </span>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={fillSampleData}
        style={{ marginTop: '1em', marginRight: '1em' }}
        aria-label="Fill Sample Data"
        title="Populate all fields with realistic sample values for quick testing."
        data-testid="fill-sample-data-button"
      >
        Fill Sample Data
      </button>
      <button
        type="button"
        onClick={() => {
          if (Object.values(errors).every(e => !e)) {
            if (typeof onChange === 'function') onChange(values);
            if (typeof window !== 'undefined' && typeof window.onCalculate === 'function') window.onCalculate(values);
          }
        }}
        style={{ marginTop: '1em' }}
        aria-label="Calculate"
        data-testid="calculate-button"
      >
        Calculate
      </button>
    </form>
  );
}
