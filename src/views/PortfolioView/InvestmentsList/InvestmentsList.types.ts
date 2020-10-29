export interface Data {
    id: number;
    name: string;
    risk: number;
    rateOfReturnPercentage: number;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}
