import React, { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios, { privateAxios } from "../api/axios"
import { CART_SERVICE_PATH, PRODUCT_SERVICE_PATH } from "../config/apiRoute"
import { ProductDetails } from "../interfaces/product-details"
import { useAppSelector } from "../app/hooks"
import { selectCurrentToken } from "../features/auth/authenticationSlice"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { increaseQuantityByOne } from "../features/cart/cartSlice"

type Props = {}

function ProductDetail({}: Props) {
  const [productDetails, setProductDetails] = useState<ProductDetails>()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  let { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    fetchProductDetail()
  }, [])

  async function fetchProductDetail() {
    if (!id) {
      // TODO move to not found page
      return
    }
    try {
      const res = await axios.get(
        `${PRODUCT_SERVICE_PATH}/products/detail/${id}?`,
      )

      if (res.status === 200) {
        const resJson = JSON.parse(res.data)
        setProductDetails(resJson)
      } else {
        console.log("fetch error at fetchProducts ", res)
      }
    } catch (error) {
      console.log("fetch error at fetchProducts ", error)
    }
  }

  const token = useAppSelector(selectCurrentToken)

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
        `${CART_SERVICE_PATH}/items/${productDetails?.id}/size/${productDetails?.sizes[selectedSize].name}`,
        null,
        config,
      )

      if (response.status >= 200 && response.status < 300) {
        toast.success(`Added product to cart`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        dispatch(increaseQuantityByOne())
      }
    } catch (error) {
      toast.error("Added to cart error")
      console.log(error)
    }

    // if success show toast
  }

  function addLineBreak(description: string | undefined): React.ReactNode {
    if (!description) {
      return <span></span>
    }

    return description.split("\\n").map(function (item, idx) {
      return (
        <span key={idx}>
          {item}
          <br />
        </span>
      )
    })
  }

  return (
    <div className="product-wrapper">
      <section className="product-image">
        <div className="row">
          <div className="col-sm-2">
            <ul>
              {productDetails?.images.map((img, index) => (
                <li>
                  <img
                    key={index}
                    className="product-secondary-image"
                    src={img}
                    alt="product image"
                    onClick={(e) => {
                      setSelectedImage(index)
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-10">
            <img
              className="product-primary-image"
              src={productDetails?.images[selectedImage]}
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="product-detail">
        <div className="card">
          <div className="card-body">
            <h2 className="fw-bold">{productDetails?.name}</h2>
            <h5>{productDetails?.brand}</h5>
            <h3 style={{ marginBottom: "5rem", marginTop: "1rem" }}>
              {productDetails?.price} EUR
            </h3>

            <div className="input-group input-group-lg mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Size
              </label>
              <select
                //value={selectedSize}
                value={selectedSize}
                onChange={e => {
                  setSelectedSize(+e.target.value)
                }}
                className="form-select"
                id="inputGroupSelect01"
              >
                {productDetails?.sizes.map((size, index) => (
                  <option
                    key={index}
                    value={index}
                    selected={index == selectedSize}
                  
                  >
                    {`${size.name} (${size.quantity})`}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-grid gap-2 mb-5">
              <button
                className="btn btn-add-product-to-cart btn-lg"
                type="button"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>
            <h5 className="fw-bold">Description</h5>
            <p>{addLineBreak(productDetails?.description as string)}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
