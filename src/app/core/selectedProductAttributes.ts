import { Material } from "./materials";
import { Size } from "./size";

export interface SelectedProductAttributes {
    material: Material | undefined;
    size: Size | undefined;
}