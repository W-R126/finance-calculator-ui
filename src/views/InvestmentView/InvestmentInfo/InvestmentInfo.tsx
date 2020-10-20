import React, {useEffect, useState} from 'react';
import {RangeInput} from '../../../components/RangeInput/RangeInput';
import {Separator} from '../../../components/Separator/Separator';
import {currencyUnit} from '../InvestmentView.constants';
import {InvestmentResults} from './InvestmentResults';
import {InvestmentParameters, InvestmentResultTypes} from '../../../api/investmentsAPI.types';
import {calculatePredictedChange} from './InvestmentInfo.helpers';
import {Box, CircularProgress} from '@material-ui/core';
import {FrequencySelector} from '../../../components/FrequencySelector/FrequencySelector';

interface Props {
    parameters: InvestmentParameters;
    setParameters: React.Dispatch<React.SetStateAction<InvestmentParameters>>;
    results: InvestmentResultTypes | null;
}

export const InvestmentInfo: React.FC<Props> = ({parameters, setParameters, results}) => {
    const currency = currencyUnit;

    const [initialDeposit, setInitialDeposit] = useState(parameters.initialDepositValue);
    const [systematicDeposit, setSystematicDeposit] = useState(parameters.systematicDepositValue);
    const [frequency, setFrequency] = useState(parameters.frequenceInYear);
    const [duration, setDuration] = useState(parameters.durationInYears);
    const [returnOfInvestment, setReturnOfInvestment] = useState(parameters.returnOfInvestment);

    useEffect(() => {
        setParameters({
            initialDepositValue: initialDeposit,
            systematicDepositValue: systematicDeposit,
            frequenceInYear: frequency,
            durationInYears: duration,
            returnOfInvestment: returnOfInvestment,
        });
    }, [setParameters, initialDeposit, systematicDeposit, frequency, duration, returnOfInvestment]);

    return (
        <>
            {results ? (
                <>
                    <Separator text="Results" />
                    <InvestmentResults
                        totalChangePercent={results.rateOfReturnPercentage}
                        totalChange={results.rateOfReturnValue}
                        predictedChange={calculatePredictedChange(
                            results.initialDepositValue,
                            results.systematicDepositValue,
                            results.durationInYears,
                            results.frequenceInYear,
                            results.rateOfReturnValue,
                        )}
                    />
                </>
            ) : (
                <Box textAlign="center" height="137px">
                    <Separator text="Results" />
                    <CircularProgress />
                </Box>
            )}
            <Separator text="Parameters" />
            <RangeInput
                minValue={1}
                maxValue={5000}
                label="initial deposit"
                unit={currency}
                value={initialDeposit}
                onChange={setInitialDeposit}
            />
            <RangeInput
                minValue={0}
                maxValue={250}
                label="systematic deposit"
                unit={currency}
                value={systematicDeposit}
                onChange={setSystematicDeposit}
            />
            <FrequencySelector value={frequency} onChange={setFrequency} label="frequency" />
            <FrequencySelector value={duration} onChange={setDuration} label="duration" />
            <RangeInput minValue={0} maxValue={100} label="ROI" unit="%" value={returnOfInvestment} onChange={setReturnOfInvestment} />
        </>
    );
};
