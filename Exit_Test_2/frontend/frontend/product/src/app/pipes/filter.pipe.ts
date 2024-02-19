import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    return value.filter(function(search){
      const productNameMatch = search.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      const brandMatch = search.brand.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      const priceMatch = search.price.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        
      return productNameMatch || brandMatch || priceMatch;
    });
  }

}
