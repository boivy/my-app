import { Injectable } from '@angular/core';

export interface CatalogProduct {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
}

export interface CatalogCategory {
  Cateid: string;
  CateName: string;
  Products: CatalogProduct[];
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly datas: CatalogCategory[] = [
    {
      Cateid: 'cate1',
      CateName: 'nuoc ngot',
      Products: [
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
      ],
    },
    {
      Cateid: 'cate2',
      CateName: 'Bia',
      Products: [
        {
          ProductId: 'p4',
          ProductName: 'Heineken',
          Price: 500,
          Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcfPk3DyM92SLiJK1bM_VfVG1uhl3XIF7SL0sbL2lKWw&s=10',
        },
        {
          ProductId: 'p5',
          ProductName: '333',
          Price: 400,
          Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bEbPZ5GaOQ_tNucGzFHRZa-Y5OJfP0YSVQDxvaF_xCYeNeUDjlcma3v2&s=10',
        },
        {
          ProductId: 'p6',
          ProductName: 'Sai Gon',
          Price: 600,
          Image: 'https://bizweb.dktcdn.net/thumb/grande/100/469/765/products/8935012413321.jpg',
        },
      ],
    },
  ];

  getCategories(): CatalogCategory[] {
    return this.datas;
  }
}