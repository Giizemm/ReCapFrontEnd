import { ActivatedRoute } from '@angular/router';
import { CarDetailService } from './../../services/car-detail.service';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CarDetail } from 'src/app/models/car-detail';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  carEditForm: FormGroup;
  carsWithDetails: CarDetail[] = [];
  backendUrl: string = 'https://localhost:44392/';
  currentCarId: number;
  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carDetailService: CarDetailService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createCarEditForm();
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.currentCarId = params['carId'];
        this.getCarById(params['carId']);
      }
    });
  }

  createCarEditForm() {
    this.carEditForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      modelYear: ['', Validators.required],
      //carImages: ['', Validators.required],
    });
  }

  getCarsWithDetail() {
    this.carService.getCarsWithDetail().subscribe((response) => {
      this.carsWithDetails = response.data;
    });
  }
  getImageByCar(id: number) {
    this.carDetailService.getImageByCar(id).subscribe((response) => {
      this.carsWithDetails = response.data;
    });
  }
  getImageUrl(url: string): string {
    return this.backendUrl + url;
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

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carEditForm.controls['brandId'].setValue(response.data.brandId);
      this.carEditForm.controls['colorId'].setValue(response.data.colorId);
      this.carEditForm.controls['dailyPrice'].setValue(
        response.data.dailyPrice
      );
      this.carEditForm.controls['description'].setValue(
        response.data.description
      );
      this.carEditForm.controls['modelYear'].setValue(response.data.modelYear);
      console.log(response.data);
    });
  }
  save() {
    if (this.carEditForm.valid) {
      let carModel = Object.assign({}, this.carEditForm.value);
      carModel.brandId = Number(carModel.brandId);
      carModel.colorId = Number(carModel.colorId);
      carModel.Id = Number(this.currentCarId);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Error?.length > 0) {
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
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
