import { Color } from './../../models/color';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css'],
})
export class ColorEditComponent implements OnInit {
  colorEditForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColorById(params['colorId']);
      }
    });
    this.createColorEditForm();
  }

  getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.colorEditForm.controls['colorId'].setValue(response.data.colorId);
      this.colorEditForm.controls['colorName'].setValue(
        response.data.colorName
      );
    });
  }

  createColorEditForm() {
    this.colorEditForm = this.formBuilder.group({
      colorId: [''],
      colorName: ['', Validators.required],
    });
  }

  save() {
    if (this.colorEditForm.valid) {
      let colorModel = Object.assign({}, this.colorEditForm.value);

      this.colorService.update(colorModel).subscribe(
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
