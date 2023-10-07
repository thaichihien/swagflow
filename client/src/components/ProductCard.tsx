import React from "react"

import {BsFillCartPlusFill,BsFillSuitHeartFill } from 'react-icons/bs'

type Props = {
  src : string
  title: string
  brand: string
  price: number
}

const ProductCard = (props: Props) => {
  return (
    <div className="card product-card">
    <div className="product-image-wrapper">
    <img
        src={props.src}
        className="card-img-top"
        alt="..."
      />
      <button className="btn btn-on-product btn-add-fav"><BsFillSuitHeartFill/></button>
      <button className="btn btn-on-product btn-add-cart"><BsFillCartPlusFill/></button>
    </div>
      <div className="card-body">
        <h4 className="card-title fw-bold">{props.title}</h4>
        <div className="d-flex justify-content-between">
          <p className="card-text fs-6">{props.brand}</p>
          <p className="card-text fs-6">{props.price} EUR</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
