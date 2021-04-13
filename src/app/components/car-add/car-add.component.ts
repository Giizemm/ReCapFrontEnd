import { AddCarModel } from './../../models/add-car-model';
import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from './../../models/brand';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  carAddForm: FormGroup;
  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel: AddCarModel = Object.assign({}, this.carAddForm.value);
      carModel.brandId=Number(carModel.brandId);
      carModel.colorId=Number(carModel.colorId);

      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          console.log(responseError);
          if (responseError.error.Error.length > 0) {
            for (let i = 0; i < responseError.error.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors(): void {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
