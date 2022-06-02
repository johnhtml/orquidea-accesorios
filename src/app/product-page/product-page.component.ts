import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  imageUrl: string | undefined;
  @Input() product: Product | undefined;
  errMess!: string;

  /*
  selectedAttributes: SelectedProductAttributes = {
    flavor: undefined,
    size: undefined,
  };*/

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe(
        (product) =>
        (this.product = product,
          this.imageUrl = product?.imageUrls[0]),
        errmess => this.errMess = <any>errmess
      );
  }

  get flavorOptions(): string {
    return (
      this.product?.flavors?.map((flavor) => flavor.name).join('|') ?? ''
    );
  }

  get sizeOptions(): string {
    return this.product?.sizes?.join('|') ?? '';
  }
}
