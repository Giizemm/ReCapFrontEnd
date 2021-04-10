import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-table',
  templateUrl: './brand-table.component.html',
  styleUrls: ['./brand-table.component.css'],
})
export class BrandTableComponent implements OnInit {
  brands: Brand[] = [];
  filterText = '';
  constructor(private brandService: BrandService,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
