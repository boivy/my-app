import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductHttpHandleErrorService } from './product-http-handle-error-service';

describe('ProductHttpHandleErrorService', () => {
  let service: ProductHttpHandleErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],});
    service = TestBed.inject(ProductHttpHandleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
