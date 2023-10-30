import React, { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../api/axios"
import { PRODUCT_SERVICE_PATH } from "../config/apiRoute"
import { ProductDetails } from "../interfaces/product-details"

type Props = {}

function ProductDetail({}: Props) {
  const [productDetails, setProductDetails] = useState<ProductDetails>()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  let { id } = useParams()

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
                className="form-select"
                id="inputGroupSelect01"
              >
                {productDetails?.sizes.map((size, index) => (
                  <option
                    key={index}
                    value={index}
                    selected={index == selectedSize}

                    onChange={(e) => {
                      setSelectedSize(index)
                    }}
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
