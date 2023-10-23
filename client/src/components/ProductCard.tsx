import React from "react"

import { BsFillCartPlusFill, BsFillSuitHeartFill } from "react-icons/bs"
import { cartAxios } from "../api/axios"
import { toast } from "react-toastify"

type Props = {
  id : string
  src: string
  title: string
  brand: string
  price: number
}

const ProductCard = (props: Props) => {
  async function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> {
    // TODO call /carts/items/:productId
    try {
      const response = await cartAxios.put(`/items/${props.id}`)

      if(response.status >= 200 && response.status < 300){
        toast.success(`Added product to cart`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }

    } catch (error) {
      toast.error('Added to cart error')
      console.log(error);
    }


    // if success show toast
  }

  return (
    <div className="card product-card">
      <div className="product-image-wrapper">
        <img src={props.src} className="card-img-top" alt="..." />
        <button className="btn btn-on-product btn-add-fav">
          <BsFillSuitHeartFill />
        </button>
        <button
          className="btn btn-on-product btn-add-cart"
          onClick={handleAddToCart}
          //disabled={true}
        >
          <BsFillCartPlusFill />
        </button>
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
