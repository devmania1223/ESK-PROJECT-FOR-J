import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShemaViewComponent } from './shema-view.component';

describe('ShemaViewComponent', () => {
  let component: ShemaViewComponent;
  let fixture: ComponentFixture<ShemaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShemaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShemaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
