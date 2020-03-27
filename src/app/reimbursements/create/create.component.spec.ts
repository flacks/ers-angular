import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementCreateComponent } from './create.component';

describe('ReimbursementCreateComponent', () => {
  let component: ReimbursementCreateComponent;
  let fixture: ComponentFixture<ReimbursementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
