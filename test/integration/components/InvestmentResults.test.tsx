import React from 'react';
import {InvestmentResults} from '../../../src/components/InvestmentResults/InvestmentResults';
import {render, screen} from '@testing-library/react';

describe('InvestmentResults.tsx', () => {
    test('should display total change', () => {
        render(<InvestmentResults totalChangePercent={0.23} totalChange={155} totalRiskPercentage={54} predictedChange={100} />);
        const value = screen.getByText('+23.00% 155$');
        // @ts-ignore
        expect(value.previousElementSibling.innerHTML).toBe('Total change');
    });

    test('should display risk factor', () => {
        render(<InvestmentResults totalChangePercent={23} totalChange={155} totalRiskPercentage={54} predictedChange={100} />);
        const value = screen.getByText('+5400.00%');
        // @ts-ignore
        expect(value.previousElementSibling.innerHTML).toBe('Total risk factor');
    });

    test('should display predicted change', () => {
        render(<InvestmentResults totalChangePercent={23} totalChange={155} totalRiskPercentage={54} predictedChange={100} />);
        const value = screen.getByText('100$');
        // @ts-ignore
        expect(value.previousElementSibling.innerHTML).toBe('Predicted value');
    });
});
