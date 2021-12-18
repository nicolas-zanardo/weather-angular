import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataWeatherComponent } from './dialog-data-weather.component';

describe('DialogDataWeatherComponent', () => {
  let component: DialogDataWeatherComponent;
  let fixture: ComponentFixture<DialogDataWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDataWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDataWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
