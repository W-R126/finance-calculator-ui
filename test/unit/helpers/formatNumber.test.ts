import * as format from '../../../src/helpers/formatNumber';

describe('formatNumber.ts', () => {
    test('formats positive number correctly', () => {
        const positiveNumber = 12.4532;

        expect(format.asPercentage(positiveNumber)).toBe('+12.45%');
    });

    test('formats negative number correctly', () => {
        const negativeNumber = -12.4532;

        expect(format.asPercentage(negativeNumber)).toBe('-12.45%');
    });

    test('formats zero correctly', () => {
        const zero = 0;

        expect(format.asPercentage(zero)).toBe('0.00%');
    });
});
