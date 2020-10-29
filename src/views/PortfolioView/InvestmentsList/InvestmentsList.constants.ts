import {HeadCell} from './InvestmentsList.types';

export const headCells: HeadCell[] = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'risk', numeric: true, disablePadding: false, label: 'Risk'},
    {id: 'rateOfReturnPercentage', numeric: true, disablePadding: false, label: 'Change'},
];
