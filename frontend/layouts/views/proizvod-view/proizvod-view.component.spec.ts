import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodViewComponent } from './proizvod-view.component';

describe('ProizvodViewComponent', () => {
  let component: ProizvodViewComponent;
  let fixture: ComponentFixture<ProizvodViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
