import React, {useEffect, useState} from 'react';
import {RadioPeriodSelector} from '../../../components/RadioPeriodSelector/RadioPeriodSelector';
import {RangeInput} from '../../../components/RangeInput/RangeInput';
import {Separator} from '../../../components/Separator/Separator';
import {currencyUnit} from '../InvestmentView.constants';
import {InvestmentResults} from './InvestmentResults';
import {InvestmentParameters, InvestmentResultTypes} from '../../../api/investmentsAPI.types';
import {inYears} from '../../../helpers/inYears';

interface Props {
    parameters: InvestmentParameters;
    setParameters: React.Dispatch<React.SetStateAction<InvestmentParameters>>;
    results: InvestmentResultTypes | null;
}

export const InvestmentInfo: React.FC<Props> = ({parameters, setParameters, results}) => {
    const currency = currencyUnit;

    const [initialDeposit, setInitialDeposit] = useState(parameters.initialDepositValue);
    const [systematicDeposit, setSystematicDeposit] = useState(parameters.systematicDepositValue);
    const [frequency, setFrequency] = useState(parameters.frequency);
    const [frequencyUnit, setFrequencyUnit] = useState(parameters.frequencyUnit);
    const [duration, setDuration] = useState(parameters.duration);
    const [durationUnit, setDurationUnit] = useState(parameters.durationUnit);
    const [ROI, setROI] = useState(parameters.returnOfInvestment);

    useEffect(() => {
        setParameters({
            initialDepositValue: initialDeposit,
            systematicDepositValue: systematicDeposit,
            frequency: frequency,
            frequencyUnit: frequencyUnit,
            frequenceInYear: inYears(frequency, frequencyUnit),
            duration: duration,
            durationUnit: durationUnit,
            durationInYears: inYears(duration, durationUnit),
            returnOfInvestment: ROI,
        });
    }, [setParameters, initialDeposit, systematicDeposit, frequency, frequencyUnit, duration, durationUnit, ROI]);

    return (
        <>
            {results && (
                <>
                    <Separator text="Results" />
                    <InvestmentResults
                        totalChangePercent={results.rateOfReturnPercentage}
                        totalChange={results.rateOfReturnValue}
                        predictedChange={
                            results.initialDepositValue +
                            results.systematicDepositValue * (results.durationInYears / results.frequenceInYear) +
                            results.rateOfReturnValue
                        }
                    />
                </>
            )}
            <Separator text="Parameters" />
            <RangeInput
                minValue={0}
                maxValue={4000}
                label="initial deposit"
                unit={currency}
                value={initialDeposit}
                setValue={setInitialDeposit}
            />
            <RangeInput
                minValue={0}
                maxValue={100}
                label="systematic deposit"
                unit={currency}
                value={systematicDeposit}
                setValue={setSystematicDeposit}
            />
            <RangeInput
                minValue={0}
                maxValue={4}
                label="frequency"
                label2="every"
                unit={frequencyUnit}
                value={frequency}
                setValue={setFrequency}
            />
            <RadioPeriodSelector periodUnit={frequencyUnit} onChange={setFrequencyUnit} />
            <RangeInput
                minValue={0}
                maxValue={10}
                label="duration"
                label2="for"
                unit={durationUnit}
                value={duration}
                setValue={setDuration}
            />
            <RadioPeriodSelector periodUnit={durationUnit} onChange={setDurationUnit} />
            <RangeInput minValue={0} maxValue={100} label="ROE" unit="%" value={ROI} setValue={setROI} />
        </>
    );
};
