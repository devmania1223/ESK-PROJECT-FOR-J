import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyLoaderComponent } from './busy-loader.component';

describe('BusyLoaderComponent', () => {
  let component: BusyLoaderComponent;
  let fixture: ComponentFixture<BusyLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
