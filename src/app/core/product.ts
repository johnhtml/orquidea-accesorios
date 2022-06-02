// core/product.ts

import { Flavor } from "./flavor";
import { Size } from "./size";

export interface Product {
    id: number;
    name: string;
    imageUrls: string[];
    price: string;
    flavors: Flavor[];
    sizes: Size[];
}