export interface Data {
    name: string;
    risk: number;
    change: number;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}
