import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { Product } from "../interfaces/product"
import { ServerConfig } from "../config/env"
import RadioFilter from "../components/RadioFilter"
import { SimplePair } from "../interfaces/simplepair"
import { useNavigate, useParams } from "react-router-dom"

function Products() {

  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<SimplePair[]>([])
  let nextPage = ""


  let {category} = useParams()



  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [category])

  async function fetchProducts() {
    
    if(!category){
      category = "all"
    }
    console.log(category);
    const res = await fetch(ServerConfig.endpoint(`/product/${category}?limit=9`))
    const resJson = await res.json()
    nextPage = resJson["next_page"]
    setProducts(resJson.data)
  }

  async function fetchCategories() {
    if (categories.length <= 0) {
      const res = await fetch(ServerConfig.endpoint("/category"))
      const resJson = await res.json()
     
      setCategories(resJson)
    }
  }

  function handleCategory(value: string): void {
    category = value
    navigate(`/products/${value}`)
  }

  return (
    <>
      <div className="products-wrapper">
        <section className="filter-side-bar">
          <div className="card">
            <div className="card-body">
              <RadioFilter<SimplePair>  radioList={categories} onChange={handleCategory} />
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <div className="filter-section">
                <h5 className="fw-bold">Brands</h5>
                <ul>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault-1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault-1"
                      >
                        Default checkbox
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault-2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault-2"
                      >
                        Default checkbox
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault-3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault-3"
                      >
                        Default checkbox
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="product-list-wrapper mb-5">
          <div className="row row-cols-3 gy-4">
            {/* <div className="column d-flex justify-content-center">
              <ProductCard
                src="https://images.meesho.com/images/products/51101648/vwud0_512.webp"
                title="Product title"
                brand="Some brand"
                price={10.5}
              />
            </div> */}
            {products.map((product) => {
              let cover = ""
              if (product.images.length > 0) {
                cover = product.images[0]
              }
              return (
                <div
                  className="column d-flex justify-content-center"
                  key={product.id}
                >
                  <ProductCard
                    src={cover}
                    title={product.name}
                    brand={product.brand}
                    price={product.price}
                  />
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}

export default Products
