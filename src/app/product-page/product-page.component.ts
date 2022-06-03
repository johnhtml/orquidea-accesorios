import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Material } from '../core/materials';
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
    material: undefined,
    size: undefined,
  };

  /*
  selectedAttributes: SelectedProductAttributes = {
    material: undefined,
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

  get materialOptions(): string {
    return (
      this.product?.materials?.map((material) => material.name).join('|') ?? ''
    );
  }

  get sizeOptions(): string {
    return this.product?.sizes?.join('|') ?? '';
  }

  setImageUrl(material: Material): void {
    const materialImageUrl = this.product?.imageUrls.find((url) =>
      url.includes(material.name)
    );
    if (!materialImageUrl) {
      throw Error(`No material for ${material.name} value`); // TODO refactor for setter
    }
    this.imageUrl = materialImageUrl;
  }

  public updateSelectedProductAttributes(material: Material | undefined, size: Size | undefined) {
    this.setSelectedAttributes(material ?? { name: "none", color: "#DDD" }, size ?? Size.SMALL);
    if (this.selectedAttributes.material) {
      //this.setImageUrl(this.selectedAttributes.material);
    }
  }

  private setSelectedAttributes(
    material: Material | undefined,
    size: Size | undefined
  ) {
    this.selectedAttributes = {
      material: material,
      size: size,
    };
  }
}
