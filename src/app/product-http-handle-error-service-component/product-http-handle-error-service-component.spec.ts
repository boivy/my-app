import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component';

describe('ProductHttpHandleErrorServiceComponent', () => {
  let component: ProductHttpHandleErrorServiceComponent;
  let fixture: ComponentFixture<ProductHttpHandleErrorServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [ProductHttpHandleErrorServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHttpHandleErrorServiceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
