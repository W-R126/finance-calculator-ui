import React from 'react';
import {render, screen} from '@testing-library/react';
import {NavBar} from '../../../src/components/NavBar/NavBar';
import {InvestmentInfo} from '../../../src/components/InvestmentInfo/InvestmentInfo';

describe('InvestmentInfo.tsx', () => {
    test(`renders info correctly`, () => {
        render(<InvestmentInfo annualChangePercent={1} annualChange={2} totalChangePercent={3} totalChange={4} predictedChange={5} />);

        screen.getByText('+1.00% 2£');
        screen.getByText('+3.00% 4£');
        screen.getByText('5£');
    });
});
