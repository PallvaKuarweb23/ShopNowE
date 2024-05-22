import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsProductComponent } from './kids-product.component';

describe('KidsProductComponent', () => {
  let component: KidsProductComponent;
  let fixture: ComponentFixture<KidsProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KidsProductComponent]
    });
    fixture = TestBed.createComponent(KidsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
