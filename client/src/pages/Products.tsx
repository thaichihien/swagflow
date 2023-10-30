import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { Product } from "../interfaces/product"
import RadioFilter from "../components/RadioFilter"
import { SimplePair } from "../interfaces/simplepair"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import CheckboxFilter from "../components/CheckboxFilter"
import axios from "../api/axios"
import { PRODUCT_SERVICE_PATH } from "../config/apiRoute"

function Products() {
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<SimplePair[]>([])
  const [brands, setBrands] = useState<SimplePair[]>([])
  const [nextPage, setNextPage] = useState("")

  let { category } = useParams()
  let brandFilters: string[] = []
  const [searchParams] = useSearchParams()
  for (const entry of searchParams.entries()) {
    const [param, value] = entry

    if (param === "brand") {
      brandFilters.push(value)
    }
  }

  function getApiUrlFilter(next: string | null): string {
    const apiPath = `${PRODUCT_SERVICE_PATH}/products/${category}?`
    let queryFilterParams: string[] = []

    queryFilterParams.push("limit=9")
    if (next) {
      queryFilterParams.push(`next=${next}`)
    }

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
      const res = await axios.get(getApiUrlFilter(null))

      if (res.status === 200) {
        const resJson = JSON.parse(res.data)

        setNextPage(resJson["next_page"])
        // console.log(nextPage);
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
        const res = await axios.get(`${PRODUCT_SERVICE_PATH}/category`)
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
        const res = await axios.get(`${PRODUCT_SERVICE_PATH}/brand`)
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

  async function fetchNextPage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (!nextPage) {
      console.log("wtf")
      return
    }

    try {
      console.log(nextPage)
      const res = await axios.get(getApiUrlFilter(nextPage))

      if (res.status === 200) {
        const resJson = JSON.parse(res.data)
        setNextPage(resJson["next_page"])
        setProducts([...products, ...resJson.data])
      } else {
        console.log("fetch error at fetchProducts ", res)
      }
    } catch (error) {
      console.log("fetch error at fetchProducts ", error)
    }
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
                    id={product.id}
                    src={cover}
                    title={product.name}
                    brand={product.brand}
                    price={product.price}
                  />
                </div>
              )
            })}
          </div>
          {/* <div className="d-flex justify-content-center mt-4"></div> */}
          <div className="d-grid gap-2 col-6 mx-auto mt-4">
            {nextPage !== null && (
              <button className="btn btn-swagflow" onClick={fetchNextPage}>
                LOAD MORE
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Products
