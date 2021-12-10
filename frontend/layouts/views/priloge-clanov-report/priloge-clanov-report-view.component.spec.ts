import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrilogeClanovReportViewComponent } from './priloge-clanov-report-view.component';

describe('PrilogeClanovReportViewComponent', () => {
  let component: PrilogeClanovReportViewComponent;
  let fixture: ComponentFixture<PrilogeClanovReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrilogeClanovReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrilogeClanovReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
