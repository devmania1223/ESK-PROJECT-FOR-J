import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakonskaPodlagaFormComponent } from './zakonska-podlaga-form.component';

describe('ZakonskaPodlagaFormComponent', () => {
  let component: ZakonskaPodlagaFormComponent;
  let fixture: ComponentFixture<ZakonskaPodlagaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakonskaPodlagaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakonskaPodlagaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
