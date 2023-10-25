import React from "react"
import { BsX } from "react-icons/bs"
import { Product } from "../interfaces/product"
import { useAppDispatch } from "../app/hooks"
import { removeItemFromCart } from "../features/cart/cartSlice"

type Props = {
  product: Product
  quantity: number
}

function CartItem({ product, quantity }: Props) {

  const dispatch = useAppDispatch()

  function handleRemoveItem(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    dispatch(removeItemFromCart(product.id))
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            // style={{width  : "10rem"}}
            src={product.images[0]}
            className="img-fluid rounded-start"
            alt={product.name}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h4 className="card-title fw-bold">{product.name}</h4>
            <h5 className="card-title">{product.brand}</h5>
            <p className="card-text">
              Size : S
              <br />
              Quantity : {quantity}
            </p>
            <p className="card-text fw-bold">{product.price} EUR</p>
            {/* <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p> */}
            <div className="position-absolute top-0 end-0 remove-item-btn" onClick={handleRemoveItem}>
              <BsX />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
