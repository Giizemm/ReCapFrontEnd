import { ActivatedRoute } from '@angular/router';
import { Brand } from './../../models/brand';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css'],
})
export class BrandEditComponent implements OnInit {
  brandEditForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
    this.createBrandEditForm();
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brandEditForm.controls['brandId'].setValue(response.data.brandId);
      this.brandEditForm.controls['name'].setValue(response.data.name);
    });
  }

  createBrandEditForm() {
    this.brandEditForm = this.formBuilder.group({
      brandId: [''],
      name: ['', Validators.required],
    });
  }

  save() {
    if (this.brandEditForm.valid) {
      let brandModel = Object.assign({}, this.brandEditForm.value);

      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
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
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
