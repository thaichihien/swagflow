import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { Product } from "../interfaces/product"
import { ServerConfig } from "../config/env"
import RadioFilter from "../components/RadioFilter"
import { SimplePair } from "../interfaces/simplepair"
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import CheckboxFilter from "../components/CheckboxFilter"
import axios from "../api/axios"

function Products() {
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<SimplePair[]>([])
  const [brands, setBrands] = useState<SimplePair[]>([])
  let nextPage = ""

  let { category } = useParams()
  let brandFilters: string[] = []
  const [searchParams] = useSearchParams()
  for (const entry of searchParams.entries()) {
    const [param, value] = entry

    if (param === "brand") {
      brandFilters.push(value)
    }
  }

  function getApiUrlFilter(): string {
    const apiPath = `/product/${category}?`
    let queryFilterParams: string[] = []

    queryFilterParams.push("limit=9")

    if (brandFilters.length > 0) {
      const brandQuery: string[] = []
      brandFilters.forEach((b) => {
        brandQuery.push(`brand=${b}`)
      })

      queryFilterParams = [...queryFilterParams, ...brandQuery]
    }

    return apiPath + queryFilterParams.join("&")
  }

  function getUrlFilter(): string {
    let apiPath = `/products/${category}`
    let queryFilterParams: string[] = []

    //queryFilterParams.push('limit=9')

    if (brandFilters.length > 0) {
      apiPath += "?"
      const brandQuery: string[] = []
      brandFilters.forEach((b) => {
        brandQuery.push(`brand=${b}`)
      })

      queryFilterParams = [...queryFilterParams, ...brandQuery]
    }

    return apiPath + queryFilterParams.join("&")
  }

  useEffect(() => {
    fetchProducts()
    fetchFilters()
  }, [category])

  async function fetchProducts() {
    if (!category) {
      category = "all"
    }

    try {
      const res = await axios.get(getApiUrlFilter())

      if (res.status === 200) {
        const resJson = JSON.parse(res.data)
        nextPage = resJson["next_page"]
        setProducts(resJson.data)
      } else {
        console.log("fetch error at fetchProducts ", res)
      }
    } catch (error) {
      console.log("fetch error at fetchProducts ", error)
    }
  }

  async function fetchFilters() {
    if (categories.length <= 0) {
      try {
        const res = await axios.get("/category")
        if (res.status === 200) {
          const resJson = JSON.parse(res.data)
          setCategories(resJson)
        } else {
          console.log("fetch error at fetchFilters ", res)
        }
      } catch (error) {
        console.log("fetch error at fetchFilters ", error)
      }
    }

    if (brands.length <= 0) {
      try {
        const res = await axios.get("/brand")
        if (res.status === 200) {
          const resJson = JSON.parse(res.data)
          setBrands(resJson)
        } else {
          console.log("fetch error at fetchFilters ", res)
        }
      } catch (error) {
        console.log("fetch error at fetchFilters ", error)
      }
    }
  }

  function handleCategory(value: string): void {
    category = value
    navigate(getUrlFilter())
  }

  function handleBrand(checked: boolean, value: string): void {
    if (checked) {
      brandFilters.push(value)
    } else {
      brandFilters = brandFilters.filter((b) => b !== value)
    }
    navigate(getUrlFilter())
    fetchProducts()
  }

  return (
    <>
      <div className="products-wrapper">
        <section className="filter-side-bar">
          <div className="card">
            <div className="card-body">
              <RadioFilter<SimplePair>
                radioList={categories}
                onChange={handleCategory}
                selected={category}
              />
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <CheckboxFilter<SimplePair>
                checkboxList={brands}
                onChange={handleBrand}
                selectedList={brandFilters}
              />
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
