import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'parseCategory',
    standalone: true, 
})
export class ParseCategoryPipe implements PipeTransform {
    transform(value: string): string {
        
      switch ( value ) {

        case 'gourmet':
            return 'Gourmet';

        case 'family':
            return 'Familiar';

        case 'buffet':
            return 'Buffet';

        case 'thematic':
            return 'Tematico';
        
        case 'fast_food':
            return 'Comida Rapida';

        case 'street_food':
            return 'Comida Callejera';
      
        default:
            return value;
      }
    }
}