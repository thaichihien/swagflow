import React from "react"
import { BsX } from "react-icons/bs"
import { Product } from "../interfaces/product"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { removeItemFromCart } from "../features/cart/cartSlice"
import { CartItem } from "../interfaces/cart-item"
import { selectCurrentToken } from "../features/auth/authenticationSlice"

type Props = {
  item: CartItem
}

function CartItemCard({ item }: Props) {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectCurrentToken)

  function handleRemoveItem(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void {
    dispatch(
      removeItemFromCart({
        productId: item.product.id,
        size: item.selectedSize,
        token: token,
      }),
    )
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            // style={{width  : "10rem"}}
            src={item.product.images[0]}
            className="img-fluid rounded-start"
            alt={item.product.name}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h4 className="card-title fw-bold">{item.product.name}</h4>
            <h5 className="card-title">{item.product.brand}</h5>
            <p className="card-text">
              Size : {item.selectedSize}
              <br />
              Quantity : {item.quantity}
            </p>
            <p className="card-text fw-bold">{item.product.price} EUR</p>
            {/* <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p> */}
            <div
              className="position-absolute top-0 end-0 remove-item-btn"
              onClick={handleRemoveItem}
            >
              <BsX />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard
