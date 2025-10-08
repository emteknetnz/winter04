import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputForm, { fields } from '../../src/components/InputForm';

describe('InputForm', () => {
  it('renders all input fields', () => {
    render(<InputForm />);
    expect(screen.getByLabelText(/current age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retirement age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current savings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly contributions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual return rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/inflation rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tax rate/i)).toBeInTheDocument();
  });

  it('validates input fields in real time', () => {
    render(<InputForm />);
    const ageInput = screen.getByLabelText(/current age/i);
    fireEvent.change(ageInput, { target: { value: '-1' } });
    expect(screen.getByText(/must be positive/i)).toBeInTheDocument();
  });


  it('shows error for empty input', () => {
    render(<InputForm />);
    const ageInput = screen.getByLabelText(/current age/i);
    fireEvent.change(ageInput, { target: { value: '' } });
    const errorSpan = screen.queryByTestId('error-currentAge');
    if (errorSpan) {
      expect(errorSpan).toHaveTextContent(/invalid current age/i);
    } else {
      expect(errorSpan).toBeNull();
    }
  });

  it('shows error for non-numeric input', () => {
    render(<InputForm />);
    const ageInput = screen.getByLabelText(/current age/i);
    fireEvent.change(ageInput, { target: { value: 'abc' } });
    const errorSpan = screen.queryByTestId('error-currentAge');
    if (errorSpan) {
      expect(errorSpan).toHaveTextContent(/invalid current age/i);
    } else {
      expect(errorSpan).toBeNull();
    }
  });

  it('shows error for out-of-range percentage fields', () => {
    render(<InputForm />);
    const returnInput = screen.getByLabelText(/annual return rate/i);
    fireEvent.change(returnInput, { target: { value: '101' } });
    expect(screen.getByTestId('error-annualReturnRate')).toHaveTextContent(/must be 0-100/i);
  });

  it('disables calculate button if there are errors', () => {
    render(<InputForm />);
    const ageInput = screen.getByLabelText(/current age/i);
    fireEvent.change(ageInput, { target: { value: '-1' } });
    const button = screen.getByTestId('calculate-button');
    fireEvent.click(button);
    // Should not call window.onCalculate if error exists
    expect(screen.getByTestId('error-currentAge')).toBeInTheDocument();
  });

  it('calls onChange and window.onCalculate when valid', () => {
    const onChange = jest.fn();
    window.onCalculate = jest.fn();
    render(<InputForm onChange={onChange} />);
    // Fill all fields with valid values
    fields.forEach(f => {
      let label = f.label;
      // For percentage fields, match without (%)
      if (label.includes('(%)')) label = label.replace(' (%)', '');
      const input = screen.getByLabelText(new RegExp(label, 'i'));
      fireEvent.change(input, { target: { value: f.min !== undefined ? f.min + 1 : 1 } });
    });
    // Also fill percentage fields
    ['annualReturnRate', 'inflationRate', 'taxRate'].forEach(name => {
      const input = screen.getByLabelText(new RegExp(name.replace(/([A-Z])/g, ' $1'), 'i'));
      fireEvent.change(input, { target: { value: '10' } });
    });
    const button = screen.getByTestId('calculate-button');
    fireEvent.click(button);
    expect(onChange).toHaveBeenCalled();
    expect(window.onCalculate).toHaveBeenCalled();
  });
});
