import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementViewComponent } from './view.component';

describe('ReimbursementDetailComponent', () => {
  let component: ReimbursementViewComponent;
  let fixture: ComponentFixture<ReimbursementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
