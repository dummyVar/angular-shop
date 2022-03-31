import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminSearch'
})
export class AdminSearchPipe implements PipeTransform {

  transform(products: any, productName: string = ''): any {
    if(!productName.trim()) {
      return products;
    }
    return products.filter((item: any) => {
      return item.name.toLowerCase().includes(productName.toLowerCase());
    })
  }

}
