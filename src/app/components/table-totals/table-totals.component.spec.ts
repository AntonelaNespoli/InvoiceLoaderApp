import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTotalsComponent } from './table-totals.component';

describe('TableTotalsComponent', () => {
  let component: TableTotalsComponent;
  let fixture: ComponentFixture<TableTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
