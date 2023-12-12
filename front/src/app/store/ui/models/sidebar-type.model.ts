import { ElementRef } from "@angular/core";

export enum SidebarTypes {
    page = 'page',
    client = 'client',
    admin = 'admin',
}

export interface SidebarTypeModel {
    value: ElementRef;
    type: SidebarTypes;
}