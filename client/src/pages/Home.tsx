import { Link } from "react-router-dom"
import Banner from "../components/Banner"
import ProductCarousel from "../components/ProductCarousel"
import { useEffect, useState } from "react"
import { Product } from "../interfaces/product"
import { ServerConfig } from "../config/env"

function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchNewProducts()
  }, [])

  async function fetchNewProducts() {
    const res = await fetch(ServerConfig.endpoint("/product/cursor?limit=6"))

    const resJson = await res.json()
    
    setProducts(resJson.data)
  }

  return (
    <>
      <Banner />
      <section style={{ marginTop: "8rem" }}>
        <div className="container d-flex justify-content-center mt-5">
          <div className="d-flex flex-column align-items-center">
            <h2 className="fw-bold">New Arrivals</h2>
            <Link to="#">View more</Link>
          </div>
        </div>
        <ProductCarousel products={products} />
      </section>
      <section style={{ marginTop: "8rem" }}>
        <div className="row g-0">
          <div className="col">
            <div className="category-block-wrapper">
              <div id="tshirts-block" className="category-block-bg"></div>
              <h4> T-Shirts</h4>
            </div>
          </div>
          <div className="col">
            <div className="category-block-wrapper">
              <div id="jeans-block" className="category-block-bg"></div>
              <h4>Jeans</h4>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col">
            <div className="category-block-wrapper">
              <div id="sweatpants-block" className="category-block-bg"></div>
              <h4> Sweatpants</h4>
            </div>
          </div>
          <div className="col">
            <div className="category-block-wrapper">
              <div id="jackets-block" className="category-block-bg"></div>
              <h4>Jackets</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
