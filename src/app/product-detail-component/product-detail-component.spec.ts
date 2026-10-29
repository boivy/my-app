import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';
import { ProductDetailComponent } from './product-detail-component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let navigatedCommands: unknown[] | undefined;
  const product = {
    id: 1,
    name: 'Coca',
    price: 15,
    image_link: '/assets/coca.png',
  };

  beforeEach(async () => {
    navigatedCommands = undefined;
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) },
        },
        {
          provide: Router,
          useValue: {
            navigate: (commands: unknown[]) => {
              navigatedCommands = commands;
              return Promise.resolve(true);
            },
          },
        },
        {
          provide: ProductHttpHandleErrorService,
          useValue: { getProductById: () => of(product) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details and image', () => {
    const element: HTMLElement = fixture.nativeElement;
    const image = element.querySelector('img');

    expect(element.textContent).toContain('Coca');
    expect(element.textContent).toContain('15');
    expect(image?.getAttribute('src')).toBe('/assets/coca.png');
    expect(image?.getAttribute('alt')).toBe('Coca');
  });

  it('should navigate back to the products list', () => {
    component.goBack();

    expect(navigatedCommands).toEqual(['/products']);
  });
});
