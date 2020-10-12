import React from 'react';
import {render, screen} from '@testing-library/react';
import {RangeInput} from '../../../src/components/RangeInput/RangeInput';

describe('RangeInput.tsx', () => {
    test(`should display label`, () => {
        render(<RangeInput minValue={-76} maxValue={300} label="hello world" unit="$" value={256} setValue={value => {}} />);

        screen.getByText('hello world');
    });

    test(`should display unit`, () => {
        render(<RangeInput minValue={-76} maxValue={300} label="hello world" unit="$" value={256} setValue={value => {}} />);

        screen.getByText('$');
    });

    test(`should display label2 if provided`, () => {
        render(
            <RangeInput
                minValue={-76}
                maxValue={300}
                label="hello world"
                label2="this is label 2"
                unit="$"
                value={256}
                setValue={value => {}}
            />,
        );

        screen.getByText('this is label 2');
    });
});
