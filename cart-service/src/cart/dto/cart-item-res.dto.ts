import { ProductDetailDto } from "./product-detail.dto"

export class CartItemResDto{
    product : ProductDetailDto
    selectedSize : string
    quantity : number
}