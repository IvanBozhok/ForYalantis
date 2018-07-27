import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPageComponent } from './img-page.component';

describe('ImgPageComponent', () => {
  let component: ImgPageComponent;
  let fixture: ComponentFixture<ImgPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
