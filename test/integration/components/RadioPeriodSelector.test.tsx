import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {RadioPeriodSelector} from '../../../src/components/RadioPeriodSelector/RadioPeriodSelector';
import {PeriodUnit} from '../../../src/components/RadioPeriodSelector/RadioPeriodSelector.types';

describe('RadioPeriodSelector.tsx', () => {
    test('renders all options', () => {
        render(<RadioPeriodSelector periodUnit={PeriodUnit.YEARS} onChange={() => {}} />);
        screen.getByLabelText('yearly');
        screen.getByLabelText('monthly');
        screen.getByLabelText('weekly');
        screen.getByLabelText('daily');
    });

    test.each([
        [PeriodUnit.YEARS, 'yearly'],
        [PeriodUnit.MONTHS, 'monthly'],
        [PeriodUnit.WEEKS, 'weekly'],
        [PeriodUnit.DAYS, 'daily'],
    ])('selects provided period unit by default', (unit, label) => {
        render(<RadioPeriodSelector periodUnit={unit} onChange={() => {}} />);
        expect(screen.getByLabelText(label)).toHaveAttribute('checked');
    });

    test('calls onChange when different period is selected', () => {
        const onChange = jest.fn();

        render(<RadioPeriodSelector periodUnit={PeriodUnit.YEARS} onChange={onChange} />);

        const input = screen.getByLabelText('weekly');
        fireEvent.click(input);

        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith(PeriodUnit.WEEKS);
    });
});
