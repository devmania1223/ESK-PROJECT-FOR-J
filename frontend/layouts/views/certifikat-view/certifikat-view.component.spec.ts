import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifikatViewComponent } from './certifikat-view.component';

describe('CertifikatViewComponent', () => {
  let component: CertifikatViewComponent;
  let fixture: ComponentFixture<CertifikatViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifikatViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifikatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
