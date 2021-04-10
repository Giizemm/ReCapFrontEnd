import { CarService } from './../../services/car.service';
import { CarDetail } from './../../models/car-detail';
import { BrandService } from './../../services/brand.service';
import { Brand } from './../../models/brand';
import { Color } from './../../models/color';
import { ColorService } from './../../services/color.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  carDetail: CarDetail[];
  currentColor: Color | null;
  colorFilter: number | null;
  brandFilter: number | null;

  constructor(
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
  }

  getColors(): void {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item ';
    }
  }
  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) {
      return true;
    } else return false;
  }

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) {
      return true;
    } else return false;
  }

  clearCurrentColor() {
    this.currentColor = null;
  }
  clearFilter() {
    if (this.colorFilter && this.brandFilter) {
       this.colorFilter=null;
       this.brandFilter=null;
    }

  }

  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item ';
    }
  }
}
