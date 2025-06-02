export interface DataPointType {
    name: string;
    gasto: number;
    ingreso: number;
    total: number;
}

export interface DataPointProps {
    data: DataPointType[];
    width?:number;
    height?: number; 
}

export interface DataPointTypeP {
    subject: string;
    A: number;
    B: number;
    fullMark: number;
}

export interface DataPointPropsP {
    data: DataPointTypeP[];
    width?:number;
    height?: number; 
}

export interface DataPointTypeC {
    name: string;
    value: number;
}

export interface DataPointPropsC {
    data: DataPointTypeC[];
    width?:number;
    height?: number; 
}

export interface DataPointPropD {
    data01: DataPointTypeC[];
    data02: DataPointTypeC[];
    width?:number;
    height?: number;
}
