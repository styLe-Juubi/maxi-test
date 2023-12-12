import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'parseMongoId',
})
export class ParseMongoIdPipe implements PipeTransform {
    transform(value: string): string {
        
      return value.replace(/(.{4})/g,"$1-").slice(0, -1);
    }
}