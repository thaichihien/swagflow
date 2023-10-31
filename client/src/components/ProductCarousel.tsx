import React, { useEffect, useRef, forwardRef, ForwardedRef } from "react"
import ProductCard from "./ProductCard"
import { Product } from "../interfaces/product"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

type MyCarouselProps = {
  products: Product[]
}

const ProductCarousel = forwardRef(
  (props: MyCarouselProps, ref: ForwardedRef<HTMLDivElement>) => {
    const carouselRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
      if (carouselRef.current) {
        const myCarousel = carouselRef.current.querySelectorAll(
          "#featureContainer .carousel .carousel-item",
        )
        myCarousel.forEach((el) => {
          const minPerSlide = 4
          let next = el.nextElementSibling as HTMLElement
          for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
              next = myCarousel[0] as HTMLElement
            }
            let cloneChild = next.cloneNode(true) as HTMLElement
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling as HTMLElement
          }
        })
      }
    }, [props.products])

    function moveToDetail(productId: string): void {
      navigate(`/product/${productId}`)
    }

    return (
      <div ref={carouselRef as ForwardedRef<HTMLDivElement>}>
        <div className="container my-3 mt-2" id="featureContainer">
          <div className="row mx-auto my-auto justify-content-center">
            <div
              id="featureCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="float-end pe-md-4">
                <a
                  className="indicator"
                  href="#featureCarousel"
                  role="button"
                  data-bs-slide="prev"
                >
                  <AiOutlineArrowLeft />
                </a>{" "}
                &nbsp;&nbsp;
                <a
                  className="w-aut indicator"
                  href="#featureCarousel"
                  role="button"
                  data-bs-slide="next"
                >
                  <AiOutlineArrowRight />
                </a>
              </div>

              <div className="carousel-inner" role="listbox">
                {props.products.map((product, index) => {
                  return (
                    <div
                      key={product.id}
                      onClick={(e) => {
                        if (index != 0) {
                          moveToDetail(product.id)
                        }
                      }}
                      className={
                        index == 0 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <div className="col-md-3">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default ProductCarousel
