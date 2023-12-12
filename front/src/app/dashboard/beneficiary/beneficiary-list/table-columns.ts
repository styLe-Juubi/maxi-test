import { ColumnModel, ColumnModelSizes, ColumnModelTypes } from "src/app/shared/models/column.model";

export const beneficiaryColumns: ColumnModel[] = [
    { apiValue: 'name', type: ColumnModelTypes.string, value: 'Nombre', size: ColumnModelSizes.mediumData },
    { apiValue: 'surname', type: ColumnModelTypes.string, value: 'Apellido', size: ColumnModelSizes.mediumData },
    { apiValue: 'birthdate', type: ColumnModelTypes.string, value: 'Fecha de Nacimiento', size: ColumnModelSizes.mediumData },
    { apiValue: 'curp', type: ColumnModelTypes.string, value: 'CURP' },
    { apiValue: 'ssn', type: ColumnModelTypes.string, value: 'SSN' },
    { apiValue: 'phone', type: ColumnModelTypes.string, value: 'Telefono' },
    { apiValue: 'nationality', type: ColumnModelTypes.string, value: 'Nacionalidad' },
    { apiValue: '', type: ColumnModelTypes.action, value: 'Acciones' },
];