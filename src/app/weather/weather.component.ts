import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public weather$?:Observable<any>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.citySelected$.subscribe((weather) => {
      this.weather$ = of(weather);
    })

  }

}
