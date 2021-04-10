import { Color } from './../models/color';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {


  transform(value: Color[], filterText: string): Color[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: Color) =>
            c.colorName.toLocaleLowerCase().indexOf(filterText.toString()) !== -1
        )
      : value;
  }


}
