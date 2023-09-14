import React, { useEffect, useRef, forwardRef, ForwardedRef } from "react"

// Chúng ta định nghĩa kiểu cho ref của phần tử
type MyCarouselProps = {
  // Thuộc tính khác của phần tử
}

// Chúng ta sử dụng forwardRef để xử lý ref
const ProductCarousel = forwardRef(
  (props: MyCarouselProps, ref: ForwardedRef<HTMLDivElement>) => {
    const carouselRef = useRef<HTMLDivElement>(null)

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
    }, [])

    return (
      <div ref={carouselRef  as ForwardedRef<HTMLDivElement>}>
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
                  Left Arrow Here
                </a>{" "}
                &nbsp;&nbsp;
                <a
                  className="w-aut indicator"
                  href="#featureCarousel"
                  role="button"
                  data-bs-slide="next"
                >
                  Right Arrow Here
                </a>
              </div>

              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-img">
                        <img src="img1.jpg" className="img-fluid" />
                      </div>
                      <div className="card-img-overlays">Slide 1</div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-img">
                        <img src="img2.jpg" className="img-fluid" />
                      </div>
                      <div className="card-img-overlays">Slide 2</div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-img">
                        <img src="img3.jpg" className="img-fluid" />
                      </div>
                      <div className="card-img-overlays">Slide 3</div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default ProductCarousel
