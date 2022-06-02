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
  }

}