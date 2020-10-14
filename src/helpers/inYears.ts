import {PeriodUnit} from '../components/RadioPeriodSelector/RadioPeriodSelector.types';

export function inYears(value: number, unit: PeriodUnit) {
    switch (unit) {
        case PeriodUnit.YEARS:
            return value;
        case PeriodUnit.MONTHS:
            return value / 12;
        case PeriodUnit.WEEKS:
            return value / 48;
        case PeriodUnit.DAYS:
            return value / 365.25;
    }
}
