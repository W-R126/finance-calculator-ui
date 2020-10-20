import {FrequencyUnit} from '../../../src/components/FrequencySelector/FrequencySelector.types';
import {convertFromYears, convertToYears} from '../../../src/components/FrequencySelector/FrequencySelector.helpers';

describe('FrequencySelector.helpers.ts', () => {
    test.each([
        [1, FrequencyUnit.YEARS, 1],
        [1, FrequencyUnit.MONTHS, 0.083],
        [1, FrequencyUnit.WEEKS, 0.0208],
        [1, FrequencyUnit.DAYS, 0.0027],
    ])('convertToYears should correctly convert %p %s to %p years', (value: number, unit: FrequencyUnit, expectedValue: number) => {
        expect(convertToYears(value, unit)).toBeCloseTo(expectedValue, 3);
    });

    test.each([
        [1, 1, FrequencyUnit.YEARS],
        [0.083, 1, FrequencyUnit.MONTHS],
        [0.0208, 1, FrequencyUnit.WEEKS],
        [0.0027, 1, FrequencyUnit.DAYS],
    ])('convertToYears should correctly convert %p years to %p %s', (value: number, expectedValue: number, unit: FrequencyUnit) => {
        expect(convertFromYears(value, unit)).toBeCloseTo(expectedValue, 3);
    });
});
