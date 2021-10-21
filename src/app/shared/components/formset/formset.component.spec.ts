import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsetComponent } from './formset.component';

describe('FormsetComponent', () => {
  let component: FormsetComponent;
  let fixture: ComponentFixture<FormsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
