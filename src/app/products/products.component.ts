import { Component, OnInit } from '@angular/core';
import { Product } from '../core/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  errMess!: string;
  breakpoint!: number;

  constructor(
    private productService: ProductService
  ) { }

  getProducts(): void {
    this.productService
      .getProducts().
      subscribe(
        products => this.products = products,
        errmess => this.errMess = <any>errmess
      )
  }

  ngOnInit() {
    this.getProducts();
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
  }


  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 2;
  }
}
