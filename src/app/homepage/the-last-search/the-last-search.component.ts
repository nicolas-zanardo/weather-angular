import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {WeatherService} from "../../service/weather.service";
import {CitySearch} from "../../models/city-search";
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatDialog} from "@angular/material/dialog";
import {DialogDataWeatherComponent} from "./dialog-data-weather/dialog-data-weather.component";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-the-last-search',
  templateUrl: './the-last-search.component.html',
  styleUrls: ['./the-last-search.component.scss']
})
export class TheLastSearchComponent implements OnInit {

  public displayedColumns: string[] = ['country', 'name'];
  public dataSource = new MatTableDataSource<CitySearch>(this.weatherService.collectionHistorySearch$.value);

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private weatherService: WeatherService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog
    ) {
  }

  public openDialog(request:string, id:number) {
    this.weatherService.getWeather(request).subscribe() ;
    this.weatherService.citySelected$.pipe(take(2)).subscribe((weather) => {
      if(weather != null && weather.id == id) {
          this.dialog.open(DialogDataWeatherComponent, {
            data: weather
          });
      }
    })
  }

  public viewDetailWeather(request:string) {
    this.weatherService.getWeather(request).subscribe() ;
    this.router.navigate(['/result'])
  }

  public deleteItemWeather(id:number) {
    const currentItems = this.weatherService.collectionHistorySearch$.getValue();
    const itemsWithoutDeleted = currentItems.filter((city:CitySearch) => city.id !== id);
    this.weatherService.historySearch = itemsWithoutDeleted
    this.dataSource = new MatTableDataSource<CitySearch>(itemsWithoutDeleted);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
