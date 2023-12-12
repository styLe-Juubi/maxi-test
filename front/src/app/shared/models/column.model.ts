export enum ColumnModelTypes {
    id = 'id',
    string = 'string',
    boolean = 'boolean',
    date = 'date',
    squareImage = 'square-image',
    rectangularImage = 'rectangular-image',
    action = 'action',
}

export enum ColumnModelSizes {
    mediumData = 'medium-data',
    largeData = 'large-data',
}


export interface ColumnModel {
    type: ColumnModelTypes;
    apiValue: string;
    value: string;
    size?: ColumnModelSizes;
}