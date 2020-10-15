export const calculatePredictedChange = (
    _initialDepositValue: number,
    _systematicDepositValue: number,
    _durationInYears: number,
    _frequenceInYear: number,
    _rateOfReturnValue: number,
) => _initialDepositValue + _systematicDepositValue * (_durationInYears / _frequenceInYear) + _rateOfReturnValue;
