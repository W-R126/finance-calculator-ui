import {FrequencyUnit} from './FrequencySelector.types';
import {maxDays, maxMonths, maxWeeks, maxYears} from './FrequencySelector.constants';

export function convertToYears(value: number, unit: FrequencyUnit): number {
    switch (unit) {
        case FrequencyUnit.YEARS:
            return value;
        case FrequencyUnit.MONTHS:
            return value / 12;
        case FrequencyUnit.WEEKS:
            return value / 48;
        case FrequencyUnit.DAYS:
            return value / 365.25;
    }
}

export function convertFromYears(value: number, unit: FrequencyUnit): number {
    switch (unit) {
        case FrequencyUnit.YEARS:
            return value;
        case FrequencyUnit.MONTHS:
            return value * 12;
        case FrequencyUnit.WEEKS:
            return value * 48;
        case FrequencyUnit.DAYS:
            return value * 365.25;
    }
}

export function getMaxValueFor(unit: FrequencyUnit): number {
    switch (unit) {
        case FrequencyUnit.YEARS:
            return maxYears;
        case FrequencyUnit.MONTHS:
            return maxMonths;
        case FrequencyUnit.WEEKS:
            return maxWeeks;
        case FrequencyUnit.DAYS:
            return maxDays;
    }
}
