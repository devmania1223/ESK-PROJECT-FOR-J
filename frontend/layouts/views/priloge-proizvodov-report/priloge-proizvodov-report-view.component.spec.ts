import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrilogeProizvodovReportViewComponent } from './priloge-proizvodov-report-view.component';

describe('PrilogeProizvodovReportViewComponent', () => {
  let component: PrilogeProizvodovReportViewComponent;
  let fixture: ComponentFixture<PrilogeProizvodovReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrilogeProizvodovReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrilogeProizvodovReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
