import { Product } from "./product"
import { ProductSize } from "./product-size"

export interface ProductDetails extends Product {
  description: string
  sizes: ProductSize[]
}
