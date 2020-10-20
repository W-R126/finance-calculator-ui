import {FrequencyUnit} from './FrequencySelector.types';

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
            return 100;
        case FrequencyUnit.MONTHS:
            return 12;
        case FrequencyUnit.WEEKS:
            return 48;
        case FrequencyUnit.DAYS:
            return 365;
    }
}
