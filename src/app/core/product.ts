// core/product.ts

import { Material } from "./materials";
import { Size } from "./size";

export interface Product {
    id: number;
    name: string;
    imageUrls: string[];
    price: string;
    materials: Material[];
    sizes: Size[];
}
