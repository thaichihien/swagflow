import React from "react"

import { BsFillCartPlusFill, BsFillSuitHeartFill } from "react-icons/bs"
import { privateAxios } from "../api/axios"
import { toast } from "react-toastify"
import { CART_SERVICE_PATH } from "../config/apiRoute"
import { useAppSelector } from "../app/hooks"
import { selectCurrentToken } from "../features/auth/authenticationSlice"
import { useNavigate } from "react-router-dom"

type Props = {
  id: string
  src: string
  title: string
  brand: string
  price: number
}

const ProductCard = (props: Props) => {
  const token = useAppSelector(selectCurrentToken)
  const navigate = useNavigate()

  async function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> {
    // TODO call /carts/items/:productId

    let config = {}

    if (token) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    }

    try {
      const response = await privateAxios.put(
        `${CART_SERVICE_PATH}/items/${props.id}`,
        null,
        config,
      )

      if (response.status >= 200 && response.status < 300) {
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
      toast.error("Added to cart error")
      console.log(error)
    }

    // if success show toast
  }

  function moveToDetail(
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
  ): void {
    navigate(`/product/${props.id}`)
  }

  return (
    <div className="card product-card">
      <div className="product-image-wrapper">
        <img
          onClick={moveToDetail}
          src={props.src}
          className="card-img-top"
          alt="..."
        />
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
        <h4
          className="card-title fw-bold"
          style={{ cursor: "pointer" }}
          onClick={moveToDetail}
        >
          {props.title}
        </h4>
        <div className="d-flex justify-content-between">
          <p className="card-text fs-6">{props.brand}</p>
          <p className="card-text fs-6">{props.price} EUR</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
