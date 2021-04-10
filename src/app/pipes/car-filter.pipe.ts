import { CarDetail } from './../models/car-detail';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carFilter',
})
export class CarFilterPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    let filteredCars = value.filter(
      (c: CarDetail) =>
        c.name.toLocaleLowerCase().indexOf(filterText) !== -1 ||
        c.colorName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
        c.dailyPrice.toString() === filterText ||
        c.modelYear.toString() === filterText
    );
    return filteredCars;
  }


}
