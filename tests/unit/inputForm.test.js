it('validates max values for percentage fields', () => {
  render(<InputForm />);
  ['annualReturnRate', 'taxRate'].forEach((name) => {
    const input = screen.getByLabelText(
      new RegExp(name.replace(/([A-Z])/g, ' $1'), 'i')
    );
    fireEvent.change(input, { target: { value: '100' } });
    expect(screen.queryByTestId(`error-${name}`)).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: '101' } });
    expect(screen.getByTestId(`error-${name}`)).toHaveTextContent(
      /must be 0-100/i
    );
  });
});

it('validates zero and large values for savings and contributions', () => {
  render(<InputForm />);
  const savingsInput = screen.getByLabelText(/current savings/i);
  fireEvent.change(savingsInput, { target: { value: '0' } });
  expect(screen.queryByTestId('error-currentSavings')).not.toBeInTheDocument();
  fireEvent.change(savingsInput, { target: { value: '1000000' } });
  expect(screen.queryByTestId('error-currentSavings')).not.toBeInTheDocument();
  const contribInput = screen.getByLabelText(/monthly contributions/i);
  fireEvent.change(contribInput, { target: { value: '0' } });
  expect(
    screen.queryByTestId('error-monthlyContribution')
  ).not.toBeInTheDocument();
  fireEvent.change(contribInput, { target: { value: '10000' } });
  expect(
    screen.queryByTestId('error-monthlyContribution')
  ).not.toBeInTheDocument();
});

it('fills sample data and validates all fields', () => {
  render(<InputForm />);
  const button = screen.getByTestId('fill-sample-data-button');
  fireEvent.click(button);
  fields.forEach((f) => {
    const input = screen.getByLabelText(
      new RegExp(f.label.replace(' (%)', ''), 'i')
    );
    expect(input.value).not.toBe('');
    const errorSpan = screen.queryByTestId(`error-${f.name}`);
    if (errorSpan) {
      expect(errorSpan.textContent).not.toMatch(/invalid/i);
    }
  });
});

it('shows errors for all fields when invalid', () => {
  render(<InputForm />);
  fields.forEach((f) => {
    const input = screen.getByLabelText(
      new RegExp(f.label.replace(' (%)', ''), 'i')
    );
    fireEvent.change(input, { target: { value: '' } });
    const errorSpan = screen.queryByTestId(`error-${f.name}`);
    if (errorSpan) {
      expect(errorSpan.textContent).toMatch(/invalid/i);
    }
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputForm, { fields } from '../../src/components/InputForm';

describe('InputForm', () => {
  it('uses correct step values for numeric inputs', () => {
    render(<InputForm />);
    fields.forEach((f) => {
      const input = screen.getByLabelText(
        new RegExp(f.label.replace(' (%)', ''), 'i')
      );
      if (f.step !== undefined) {
        expect(input).toHaveAttribute('step', f.step.toString());
      }
    });
  });
  it('increments and decrements values according to step', () => {
    render(<InputForm />);
    fields.forEach((f) => {
      const input = screen.getByLabelText(
        new RegExp(f.label.replace(' (%)', ''), 'i')
      );
      if (f.step !== undefined) {
        // Simulate increment
        fireEvent.change(input, { target: { value: f.step } });
        expect(input.value).toBe(f.step.toString());
        // Simulate decrement
        fireEvent.change(input, { target: { value: 0 } });
        expect(input.value).toBe('0');
      }
    });
  });
  it('renders all input fields', () => {
    render(<InputForm />);
    expect(screen.getByLabelText(/current age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retirement age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current savings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monthly contributions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual return rate/i)).toBeInTheDocument();
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
    expect(screen.getByTestId('error-annualReturnRate')).toHaveTextContent(
      /must be 0-100/i
    );
  });

  it('disables calculate button if there are errors', () => {
    render(<InputForm />);
    const ageInput = screen.getByLabelText(/current age/i);
    fireEvent.change(ageInput, { target: { value: '-1' } });
    // Should show error for invalid age
    expect(screen.getByTestId('error-currentAge')).toBeInTheDocument();
  });

  it('calls onChange and window.onCalculate when valid', () => {
    const onChange = jest.fn();
    window.onCalculate = jest.fn();
    render(<InputForm onChange={onChange} />);
    // Fill all fields with valid values
    fields.forEach((f) => {
      let label = f.label;
      if (label.includes('(%)')) label = label.replace(' (%)', '');
      const input = screen.getByLabelText(new RegExp(label, 'i'));
      fireEvent.change(input, {
        target: { value: f.min !== undefined ? f.min + 1 : 1 },
      });
    });
    // Also fill percentage fields
    ['annualReturnRate', 'inflationRate', 'taxRate'].forEach((name) => {
      const input = screen.getByLabelText(
        new RegExp(name.replace(/([A-Z])/g, ' $1'), 'i')
      );
      fireEvent.change(input, { target: { value: '10' } });
    });
    // Calculation should trigger on input change
    expect(onChange).toHaveBeenCalled();
    expect(window.onCalculate).toHaveBeenCalled();
  });
});
