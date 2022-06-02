import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flavor } from '../core/flavor';
import { Product } from '../core/product';
import { Size } from '../core/size';
import { ProductService } from '../services/product.service';
import { SelectedProductAttributes } from '../core/selectedProductAttributes'; 

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  imageUrl: string | undefined;
  @Input() product: Product | undefined;
  errMess!: string;
  selectedAttributes: SelectedProductAttributes = {
    flavor: undefined,
    size: undefined,
  };

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

  setImageUrl(flavor: Flavor): void {
    const flavorImageUrl = this.product?.imageUrls.find((url) =>
      url.includes(flavor.name)
    );
    if (!flavorImageUrl) {
      throw Error(`No flavor for ${flavor.name} value`); // TODO refactor for setter
    }
    this.imageUrl = flavorImageUrl;
  }

  public updateSelectedProductAttributes(flavor: Flavor | undefined, size: Size | undefined) {
    this.setSelectedAttributes(flavor ?? { name: "none", color: "#DDD" }, size ?? Size.SMALL);
    if (this.selectedAttributes.flavor) {
      //this.setImageUrl(this.selectedAttributes.flavor);
    }
  }

  private setSelectedAttributes(
    flavor: Flavor | undefined,
    size: Size | undefined
  ) {
    this.selectedAttributes = {
      flavor: flavor,
      size: size,
    };
  }
}
