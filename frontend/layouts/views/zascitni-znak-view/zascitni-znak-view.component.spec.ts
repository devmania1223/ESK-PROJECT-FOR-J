import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejavnostViewComponent } from './dejavnost-view.component';

describe('DejavnostViewComponent', () => {
  let component: DejavnostViewComponent;
  let fixture: ComponentFixture<DejavnostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DejavnostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DejavnostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
