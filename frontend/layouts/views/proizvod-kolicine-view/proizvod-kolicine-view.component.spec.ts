import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodKolicineViewComponent } from './proizvod-kolicine-view.component';

describe('ProizvodKolicineViewComponent', () => {
  let component: ProizvodKolicineViewComponent;
  let fixture: ComponentFixture<ProizvodKolicineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProizvodKolicineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProizvodKolicineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
