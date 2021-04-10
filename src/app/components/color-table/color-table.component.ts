import { ColorService } from './../../services/color.service';
import { Color } from './../../models/color';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-table',
  templateUrl: './color-table.component.html',
  styleUrls: ['./color-table.component.css']
})
export class ColorTableComponent implements OnInit {

  colors: Color[] = [];
  filterText = '';
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors(): void {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
