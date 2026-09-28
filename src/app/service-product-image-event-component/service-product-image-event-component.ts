import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageProduct, ProductService } from '../product.service';

@Component({
  selector: 'app-service-product-image-event',
  standalone: false,
  templateUrl: './service-product-image-event-component.html',
  styleUrl: './service-product-image-event-component.css',
})
export class ServiceProductImageEventComponent {
  readonly products: ImageProduct[];

  constructor(productService: ProductService, private router: Router) {
    this.products = productService.getProductsWithImages();
  }

  viewDetail(product: { ProductId: string }): void {
    this.router.navigate(['service-product-image-event', product.ProductId]);
  }
}