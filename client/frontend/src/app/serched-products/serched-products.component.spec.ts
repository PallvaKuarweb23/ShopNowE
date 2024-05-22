import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchedProductsComponent } from './serched-products.component';

describe('SerchedProductsComponent', () => {
  let component: SerchedProductsComponent;
  let fixture: ComponentFixture<SerchedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerchedProductsComponent],
    });
    fixture = TestBed.createComponent(SerchedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
