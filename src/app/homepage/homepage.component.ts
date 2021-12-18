import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first, Observable, skip, take, tap} from "rxjs";
import {City} from "../models/city.model";
import {WeatherService} from "../service/weather.service";
import {SelectCompare} from "../models/SelectCompare.model";
import {Router} from "@angular/router"
import {language} from "../data/language.list";
import {units} from "../data/units.list";
import {CitySearch} from "../models/city-search";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  /**
   * ## ENV_LANGUAGE_DEFAULT
   * @description must be considered as an environment variable
   * @private string ENV_LANGUAGE_DEFAULT
   */
  private ENV_LOCALE_DEFAULT: string = "en";
  private ENV_UNITS_DEFAULT: string = "metric"

  public cityCtrl = new FormControl();
  public filteredCities = new Observable<City[]>();
  public formSearch!: FormGroup;
  public languages: SelectCompare[] = language;
  public units: SelectCompare[] = units;

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  /**
   * ## Customizing option selection
   * @example HTML <select [compareWith]="compareFn">
   * @tutorial https://angular.io/api/forms/SelectControlValueAccessor#customizing-option-selection
   * @param t1
   * @param t2
   */
  public compareLanguage(t1: string, t2: string = this.ENV_LOCALE_DEFAULT ): boolean {
    return t1 === t2;
  }

  public compareUnits(t1: string, t2: string = this.ENV_UNITS_DEFAULT ): boolean {
    return t1 === t2;
  }

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      searchCity: new FormControl(null, Validators.required),
      temp: new  FormControl(this.ENV_UNITS_DEFAULT),
      language: new FormControl(this.ENV_LOCALE_DEFAULT)
    })
  }

  submit() {
    if(this.formSearch.valid) {
      const request = `${this.formSearch.value.searchCity}&lang=${this.formSearch.value.language}&units=${this.formSearch.value.temp}`;
      this.weatherService.getWeather(request).pipe(
        tap(city => {
          if(city != null) {
                  objLastSearch = {
                    coord: {
                      lat: city.coord.lat,
                      lon: city.coord.lon
                    },
                    country: city.sys.country,
                    id: city.id,
                    name: city.name,
                    request: request,
                    state: city.state
                  }

                  arrayTmp.push(objLastSearch)
                  this.weatherService.historySearch = arrayTmp;
                }
        })
      ).subscribe();
      let objLastSearch: CitySearch;
      let arrayTmp : CitySearch[]= this.weatherService.collectionHistorySearch$.value;
      this.router.navigate(['/result'])
    }
  }


}
