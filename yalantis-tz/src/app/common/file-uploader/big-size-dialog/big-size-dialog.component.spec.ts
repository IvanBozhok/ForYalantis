import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigSizeDialogComponent } from './big-size-dialog.component';

describe('BigSizeDialogComponent', () => {
  let component: BigSizeDialogComponent;
  let fixture: ComponentFixture<BigSizeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigSizeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigSizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
