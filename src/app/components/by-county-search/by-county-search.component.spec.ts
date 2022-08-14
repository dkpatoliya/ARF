import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCountySearchComponent } from './by-county-search.component';

describe('ByCountySearchComponent', () => {
  let component: ByCountySearchComponent;
  let fixture: ComponentFixture<ByCountySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByCountySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByCountySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
