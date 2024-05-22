import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlepartComponent } from './middlepart.component';

describe('MiddlepartComponent', () => {
  let component: MiddlepartComponent;
  let fixture: ComponentFixture<MiddlepartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiddlepartComponent]
    });
    fixture = TestBed.createComponent(MiddlepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
