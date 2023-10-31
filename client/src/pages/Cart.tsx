import React, { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getCart, selectCart } from "../features/cart/cartSlice"
import { selectCurrentToken } from "../features/auth/authenticationSlice"
import CartItemCard from "../components/CartItemCard"

type Props = {}

function Cart({}: Props) {
  const cartResponse = useAppSelector(selectCart)
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectCurrentToken)

  useEffect(() => {
    // TODO call api /carts
    dispatch(getCart(token))
  }, [])

  return (
    <div className="cart-wrapper">
      <section className="cart-shopping-wrapper">
        {cartResponse.cart.items.map((product) => (
          <CartItemCard item={product} />
        ))}
      </section>
      <section className="checkout-wrapper">
        <div className="card">
          <div className="card-body p-4">
            <h4 className="fw-bold">Order Summary</h4>
            <div className="divider my-3"></div>
            <div className="row">
              <div className="col">Items</div>
              <div className="col text-end">
                {cartResponse.cart.totalQuantity}
              </div>
            </div>
            <div className="row">
              <div className="col">Subtotal</div>
              <div className="col text-end">
                {cartResponse.cart.totalPrice} EUR
              </div>
            </div>
            <div className="row">
              <div className="col">Shipping</div>
              <div className="col text-end">25 EUR</div>
            </div>
            <div className="divider my-3"></div>
            <div className="row">
              <div className="col">
                <h4 className="fw-bold">Total</h4>
              </div>
              <div className="col text-end">{(cartResponse.cart.totalPrice + 25).toFixed(2)} EUR</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cart
