import {FrequencyUnit} from '../../../src/components/FrequencySelector/FrequencySelector.types';
import {convertFromYears, convertToYears} from '../../../src/components/FrequencySelector/FrequencySelector.helpers';

describe('FrequencySelector.helpers.ts', () => {
    test.each([
        [1, FrequencyUnit.YEARS, 1],
        [1, FrequencyUnit.MONTHS, 1 / 12],
        [1, FrequencyUnit.WEEKS, 1 / 48],
        [1, FrequencyUnit.DAYS, 1 / 365.25],
    ])('convertToYears should correctly convert %p %s to %p years', (value: number, unit: FrequencyUnit, expectedValue: number) => {
        expect(convertToYears(value, unit)).toBeCloseTo(expectedValue, 12);
    });

    test.each([
        [1, 1, FrequencyUnit.YEARS],
        [1, 12, FrequencyUnit.MONTHS],
        [1, 48, FrequencyUnit.WEEKS],
        [1, 365.25, FrequencyUnit.DAYS],
    ])('convertToYears should correctly convert %p years to %p %s', (value: number, expectedValue: number, unit: FrequencyUnit) => {
        expect(convertFromYears(value, unit)).toBeCloseTo(expectedValue, 12);
    });

    test.each([
        [1, FrequencyUnit.YEARS],
        [1, FrequencyUnit.MONTHS],
        [1, FrequencyUnit.WEEKS],
        [1, FrequencyUnit.DAYS],
        [0.1, FrequencyUnit.YEARS],
        [0.1, FrequencyUnit.MONTHS],
        [0.1, FrequencyUnit.WEEKS],
        [0.1, FrequencyUnit.DAYS],
        [975, FrequencyUnit.YEARS],
        [975, FrequencyUnit.MONTHS],
        [975, FrequencyUnit.WEEKS],
        [975, FrequencyUnit.DAYS],
    ])('backwards conversion precision loss is negligible', (value: number, unit: FrequencyUnit) => {
        expect(convertToYears(convertFromYears(value, unit), unit)).toBeCloseTo(value, 12);
    });
});
