import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'closedCustomer',
    standalone: true, 
})
export class ClosedCustomerPipe implements PipeTransform {
    transform(value: string): string {
        
        if ( value === 'closed' ) 
            return 'Cerrado';

        return value;
    }
}