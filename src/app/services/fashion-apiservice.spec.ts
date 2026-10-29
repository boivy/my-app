import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from './fashion-apiservice';

describe('FashionAPIService', () => {
  let service: FashionAPIService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FashionAPIService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the fashion collection as JSON', () => {
    const fashions = [Object.assign(new Fashion(), { _id: '1', style: 'Street' })];

    service.getFashions().subscribe((result) => {
      expect(result).toEqual(fashions);
    });

    const request = httpTestingController.expectOne('/fashions');
    expect(request.request.method).toBe('GET');
    request.flush(fashions);
  });

  it('should return a fashion item as JSON', () => {
    const fashion = Object.assign(new Fashion(), { _id: 'item/1', style: 'Street' });

    service.getFashion(fashion._id).subscribe((result) => {
      expect(result).toEqual(fashion);
    });

    const request = httpTestingController.expectOne('/fashions/item%2F1');
    expect(request.request.method).toBe('GET');
    request.flush(fashion);
  });
});
