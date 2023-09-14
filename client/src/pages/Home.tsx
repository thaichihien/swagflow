import { Link } from "react-router-dom"
import Banner from "../components/Banner"
import ProductCarousel from "../components/ProductCarousel"

function Home() {
  return (
    <>
      <Banner />
      <section>
        <div className="container d-flex justify-content-center mt-5">
          <div className="d-flex flex-column align-items-center">
            <h2 className="fw-bold">New Arrivals</h2>
            <Link to="#">View more</Link>
          </div>
        </div>
        <ProductCarousel />
      </section>
      <section>
        <div className="row g-0">
          <div className="col">
            <div
              className="category-block-wrapper"
              style={{
                backgroundColor: "#f0f0f0", // Màu nền xám
              }}
            ></div>
          </div>
          <div className="col">
            <div className="category-block-wrapper"></div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col">
            <div className="category-block-wrapper"></div>
          </div>
          <div className="col">
            <div
              className="category-block-wrapper"
              style={{
                backgroundColor: "#f0f0f0", // Màu nền xám
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
