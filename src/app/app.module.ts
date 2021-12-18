import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {WeatherService} from "./service/weather.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import {LayoutModule} from "./shared/layout/layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { WeatherComponent } from './weather/weather.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TheLastSearchComponent } from './homepage/the-last-search/the-last-search.component';
import {DialogDataWeatherComponent} from "./homepage/the-last-search/dialog-data-weather/dialog-data-weather.component";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WeatherComponent,
    PageNotFoundComponent,
    TheLastSearchComponent,
    DialogDataWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
