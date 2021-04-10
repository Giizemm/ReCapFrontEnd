import { Brand } from 'src/app/models/brand';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[], filterText: string): Brand[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (b: Brand) =>
            b.name.toLocaleLowerCase().indexOf(filterText.toString()) !== -1
        )
      : value;
  }

}
