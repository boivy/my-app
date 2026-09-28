import { Component } from '@angular/core';
import { Product } from '../classes/iProduct';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  templateUrl: './product-list-call-service-component.html',
  styleUrl: './product-list-call-service-component.css',
})
export class ProductListCallServiceComponent {
  min_price:number=0
  max_price:number=10
  products:Product[]=[]
  constructor(private ps:ProductService){
    //this.products=ps.getProductList()
  }
  ngOnInit():void
  {
    this.products=this.ps.getProductList()
  }
  callFilterProductListByPrice()
  {
    this.products=this.ps.filterProductListByPrice(this.min_price,this.max_price)
  }
}
