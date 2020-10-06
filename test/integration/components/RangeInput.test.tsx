import React from 'react';
import {render, screen} from '@testing-library/react';
import {RangeInput} from '../../../src/components/RangeInput/RangeInput';

describe('RangeInput.tsx', () => {
    test(`should display label`, () => {
        render(<RangeInput minValue={-76} maxValue={300} label="hello world" />);

        screen.getByText('hello world');
    });
    test('default value should be mean value', () => {
        const minValue = -76;
        const maxValue = 300;

        render(<RangeInput minValue={minValue} maxValue={maxValue} label={'label'} />);
        const wrapper = screen.getByTestId('input');
        expect(wrapper).toHaveAttribute('value', `${(minValue + maxValue) / 2}`);
    });
});
