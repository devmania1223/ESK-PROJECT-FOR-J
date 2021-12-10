import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakonskaPodlagaViewComponent } from './zakonska-podlaga-view.component';

describe('ZakonskaPodlagaViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ZakonskaPodlagaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakonskaPodlagaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakonskaPodlagaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
