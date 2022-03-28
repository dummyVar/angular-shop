import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientSearch'
})
export class ClientSearchPipe implements PipeTransform {

  transform(products: any, ...params: any): any {
    if(!params[0].trim()) {
      return products;
    }
    return products.filter((item: any) => {
      return item.name.toLowerCase().includes(params[0].toLowerCase());
    })
  }

}
