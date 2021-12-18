import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {CitySearch} from "../models/city-search";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public citySelected$: BehaviorSubject<any>= new BehaviorSubject(null);
  public collectionHistorySearch$: BehaviorSubject<CitySearch[]|[]> = new BehaviorSubject<CitySearch[]|[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.collectionHistorySearch$.next(JSON.parse(localStorage.getItem('lastSearch') || '[]'));
  }

  private handleError<T>(result?: T) {
    return (e: any): Observable<T> => {
      console.log('ERROR - response API', e.error )
      this.citySelected$.next(null);
      this.router.navigate(['/result'])
      return of(result as T);
    };
  }

  public getWeather(request:string): Observable<any> {
    return this.http.get<any>(env.config.feedRoot + request).pipe(
      tap(weatherApi => {
       this.citySelected$.next(weatherApi)
      }),
      catchError(this.handleError<any>())
    );
  }

  set historySearch(searchCity: CitySearch[]) {
    localStorage.setItem('lastSearch', JSON.stringify(searchCity));
    this.collectionHistorySearch$.next(JSON.parse(localStorage.getItem('lastSearch') || '[]'))
  }

}

