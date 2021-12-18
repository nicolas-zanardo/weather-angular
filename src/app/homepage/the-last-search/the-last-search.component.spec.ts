import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheLastSearchComponent } from './the-last-search.component';

describe('TheLastSearchComponent', () => {
  let component: TheLastSearchComponent;
  let fixture: ComponentFixture<TheLastSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheLastSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheLastSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
