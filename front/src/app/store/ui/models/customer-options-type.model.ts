import { ElementRef } from "@angular/core";

export enum FiltersTypes {
    adminHeader = 'admin-header',
}

export interface FiltersTypeModel {
    type: FiltersTypes;
    value: ElementRef;
}