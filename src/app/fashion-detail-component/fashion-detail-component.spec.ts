import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';
import { FashionDetailComponent } from './fashion-detail-component';

describe('FashionDetailComponent', () => {
  let component: FashionDetailComponent;
  let fixture: ComponentFixture<FashionDetailComponent>;
  let fashionService: Pick<FashionAPIService, 'getFashion'>;

  beforeEach(async () => {
    fashionService = {
      getFashion: vi.fn(() =>
        of(new Fashion('fashion-id', 'Street', 'Street style', 'A detailed description')),
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [FashionDetailComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 'fashion-id' })) },
        },
        { provide: FashionAPIService, useValue: fashionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the fashion selected by its route ID', () => {
    expect(fashionService.getFashion).toHaveBeenCalledWith('fashion-id');
    expect(component.fashion()?.fashion_subject).toBe('Street style');
  });
});
