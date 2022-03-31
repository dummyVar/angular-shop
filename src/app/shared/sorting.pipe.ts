import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: any, type = ''): any {
    if(type == '') {
      return products;
    }
    return products.filter((item: any) => {
      return item.category == type;
    })
  }

}
