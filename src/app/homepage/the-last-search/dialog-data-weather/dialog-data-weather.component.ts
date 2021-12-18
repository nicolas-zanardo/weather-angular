import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-data-weather',
  templateUrl: './dialog-data-weather.component.html',
  styleUrls: ['./dialog-data-weather.component.scss']
})
export class DialogDataWeatherComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
  }


}


