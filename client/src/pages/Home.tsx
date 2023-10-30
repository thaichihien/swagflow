import { Link, useNavigate } from "react-router-dom"
import Banner from "../components/Banner"
import ProductCarousel from "../components/ProductCarousel"
import { MouseEvent, useEffect, useState } from "react"
import { Product } from "../interfaces/product"
import axios from "../api/axios"
import { PRODUCT_SERVICE_PATH } from "../config/apiRoute"

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchNewProducts()
  }, [])

  async function fetchNewProducts() {
    try {
      const res = await axios.get(`${PRODUCT_SERVICE_PATH}/products/all?limit=6`)

      if(res.status == 200){
        const resJson = JSON.parse(res.data)
        setProducts(resJson.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function moveToCategory(category: string): void {
    navigate(`/products/${category}`)
  }

  return (
    <>
      <Banner />
      <section style={{ paddingTop: "6rem",paddingBottom : "6rem",backgroundColor: "white" }}>
        <div className="container d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <h2 className="fw-bold">New Arrivals</h2>
            <Link to="/products/all">View more</Link>
          </div>
        </div>
        <ProductCarousel products={products} />
      </section>
      <section >
        <div className="row g-0">
          <div className="col">
            <div className="category-block-wrapper" onClick={e => moveToCategory('T-Shirts')}>
              <div id="tshirts-block" className="category-block-bg"></div>
              <h4> T-Shirts</h4>
            </div>
          </div>
          <div className="col">
            <div className="category-block-wrapper" onClick={e => moveToCategory('Jeans')}>
              <div id="jeans-block" className="category-block-bg"></div>
              <h4>Jeans</h4>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col">
            <div className="category-block-wrapper" onClick={e => moveToCategory('Sweatpants')}>
              <div id="sweatpants-block" className="category-block-bg"></div>
              <h4> Sweatpants</h4>
            </div>
          </div>
          <div className="col">
            <div className="category-block-wrapper" onClick={e => moveToCategory('Jackets')}>
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
