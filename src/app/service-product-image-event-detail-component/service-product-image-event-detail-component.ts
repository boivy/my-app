import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProduct, ProductService } from '../product.service';

@Component({
  selector: 'app-service-product-image-event-detail',
  standalone: false,
  templateUrl: './service-product-image-event-detail-component.html',
  styleUrl: './service-product-image-event-detail-component.css',
})
export class ServiceProductImageEventDetailComponent {
  selectedProduct: ImageProduct | undefined;

  constructor(route: ActivatedRoute, productService: ProductService, private router: Router) {
    route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.selectedProduct = id ? productService.getProductDetail(id) : undefined;
    });
  }

  goBack(): void {
    this.router.navigate(['service-product-image-event']);
  }
}