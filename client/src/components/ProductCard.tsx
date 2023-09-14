import React from "react"

import {BsFillCartPlusFill,BsFillSuitHeartFill } from 'react-icons/bs'

type Props = {}

const ProductCard = (props: Props) => {
  return (
    <div className="card product-card">
    <div className="product-image-wrapper">
    <img
        src="https://images.meesho.com/images/products/51101648/vwud0_512.webp"
        className="card-img-top"
        alt="..."
      />
      <button className="btn btn-on-product btn-add-fav"><BsFillSuitHeartFill/></button>
      <button className="btn btn-on-product btn-add-cart"><BsFillCartPlusFill/></button>
    </div>
      <div className="card-body">
        <h4 className="card-title fw-bold">Card title</h4>
        <div className="d-flex justify-content-between">
          <p className="card-text fs-6">Some Brand</p>
          <p className="card-text fs-6">150.000 VND</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
