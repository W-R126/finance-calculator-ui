import React from 'react';
import {render, screen} from '@testing-library/react';
import {RangeInput} from '../../../src/components/RangeInput/RangeInput';

describe('RangeInput.tsx', () => {
    test(`should display label`, () => {
        render(<RangeInput minValue={-76} maxValue={300} label="hello world" />);

        screen.getByText('hello world');
    });
});
