import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    
    const countryCode = value.substr(1, 2); 
    const areaCode = value.substr(2, 4);  
    const firstPart = value.substr(6, 3);  
    const secondPart = value.substr(9, 2); 
    const thirdPart = value.substr(11, 2); 

    return `+${countryCode} ${areaCode} ${firstPart} ${secondPart} ${thirdPart}`;
  }

}