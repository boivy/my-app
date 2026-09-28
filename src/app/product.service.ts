import { Injectable } from '@angular/core';

export interface ImageProduct {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly productsImage: ImageProduct[] = [
    {
      ProductId: 'p1',
      ProductName: 'Coca',
      Price: 100,
      Image: 'https://png.pngtree.com/png-clipart/20231116/original/pngtree-coca-cola-bottled-drink-isolated-photo-png-image_13575918.png',
    },
    {
      ProductId: 'p2',
      ProductName: 'Pepsi',
      Price: 300,
      Image: 'https://png.pngtree.com/png-clipart/20250222/original/pngtree-classic-pepsi-can-refreshing-carbonated-soft-drink-png-image_20493806.png',
    },
    {
      ProductId: 'p3',
      ProductName: 'Sting',
      Price: 200,
      Image: 'https://pos.nvncdn.com/35ab07-173722/ps/Nuoc-Tang-Luc-Sting-Dau-Chai-330ml.png?v=1745194319',
    },
  ];

  getProductsWithImages(): ImageProduct[] {
    return this.productsImage;
  }

  getProductDetail(id: string): ImageProduct | undefined {
    return this.productsImage.find((product) => product.ProductId === id);
  }
}