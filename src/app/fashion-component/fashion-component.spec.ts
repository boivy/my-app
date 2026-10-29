import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { FashionAPIService } from '../services/fashion-apiservice';
import { FashionComponent } from './fashion-component';

describe('FashionComponent', () => {
  let component: FashionComponent;
  let fixture: ComponentFixture<FashionComponent>;
  let fashionService: Pick<FashionAPIService, 'getFashions'>;

  beforeEach(async () => {
    fashionService = { getFashions: vi.fn(() => of([])) };

    await TestBed.configureTestingModule({
      declarations: [FashionComponent],
      providers: [
        provideRouter([]),
        { provide: FashionAPIService, useValue: fashionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the fashion list', () => {
    expect(fashionService.getFashions).toHaveBeenCalled();
    expect(component.fashions()).toEqual([]);
  });
});
