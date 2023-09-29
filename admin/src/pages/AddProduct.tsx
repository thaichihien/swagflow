import React, { useEffect, useState } from "react"
import UploadImage from "../component/UploadImage"
import SizeQuantitySection from "../component/SizeQuantity"
import { Category } from "../interfaces/category"
import { SizeQuantity } from "../interfaces/size-quantity"
import AddCategory from "../component/AddCategory"
import AddBrand from "../component/AddBrand"
import { serverConfig } from "../config/env"
import { Product } from "../features/products/productSlide"
import { useNavigate } from "react-router-dom"
import LoadingDialog from "../component/LoadingDialog"
import { ToastContainer,toast } from "react-toastify"

type Props = {}

function AddProduct({}: Props) {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState(0)
  const [categoryId, setCategoryId] = useState("")
  const [brandId, setBrandId] = useState("")
  const [productDescription, setProductDescription] = useState("")
  // const [sizeQuantity, setSizeQuantity] = useState<SizeQuantity[]>([])
  let sizeQuantity: SizeQuantity[] = []
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [brandList, setBrandList] = useState<Category[]>([])
  const [imageList, setImageList] = useState<File[]>([])

  const [loading, setLoading] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showBrandModal, setShowBrandModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // // - get category list
    fetch(serverConfig.endpoint("/category"))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setCategoryList(data)
        if (data.length > 0) {
          setCategoryId(data[0].id)
        }
      })
      .catch((error) => {
        console.error(error)
      })
    fetch(serverConfig.endpoint("/brand"))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setBrandList(data)
        if (data.length > 0) {
          setBrandId(data[0].id)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  async function submitAddProduct() {
    setLoading(true)
    const createProductDto = {
      name: productName,
      description: productDescription,
      price: productPrice,
      category_id: categoryId,
      brand_id: brandId,
      sizes: sizeQuantity,
    }
    console.log(createProductDto)

    try {
      const productRes = await fetch(serverConfig.endpoint("/product"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createProductDto),
      })

      const product: Product = await productRes.json()

      if (imageList.length > 0) {
        const formData: FormData = new FormData()
        imageList.forEach((image) => {
          formData.append("file[]", image)
        })
        //formData.append("file", imageList[0])

        const finalRes = await fetch(
          serverConfig.endpoint(`/product/image/${product.id}`),
          {
            method: "PUT",
            body: formData,
          },
        )

        if (finalRes.ok) {
          // - redirect
          
          navigate("/products")
        }
      }
    } catch (error) {
      setLoading(false)
      
      toast.error('Error occurs!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log(error)
    }
  }

  return (
    <>
      <div className="page-header">
        <h3 className="page-title"> Add new product </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Products</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Product
            </li>
          </ol>
        </nav>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">Product information</h3>

          <form className="forms-sample">
            <div className="form-group">
              <label htmlFor="product-name">Name</label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Name"
                onChange={(e) => {
                  setProductName(e.target.value)
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product-category">Category</label>
              <div className="input-group">
                <select
                  defaultValue={categoryId}
                  className="form-control"
                  id="product-category"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categoryList.map((category, index: number) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-primary px-3"
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                  >
                    Add new category
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="product-brand">Brand</label>
              <div className="input-group">
                <select
                  defaultValue={brandId}
                  className="form-control"
                  id="product-brand"
                  onChange={(e) => setBrandId(e.target.value)}
                >
                  {brandList.map((brand, index: number) => (
                    <option key={index} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-primary px-3"
                    type="button"
                    onClick={() => setShowBrandModal(true)}
                  >
                    Add new brand
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputName1">Price</label>
              <input
                type="text"
                className="form-control"
                id="product-price"
                placeholder="Price"
                onChange={(e) => setProductPrice(+e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea1">Description</label>
              <textarea
                className="form-control"
                id="exampleTextarea1"
                rows={4}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Upload images</h4>
          <p className="card-description">
            The first image will be the product thumbnail
          </p>
          <UploadImage onUploadImages={(arr) => setImageList(arr)} />
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Quantity</h4>
          <p className="card-description">
            {" "}
            Add corresponding size and quantity
          </p>
          <SizeQuantitySection
            onSizeAndQuantityChange={(arr) => {
              sizeQuantity = arr
            }}
          />
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary mr-2"
              onClick={submitAddProduct}
            >
              Confirm
            </button>
            <button className="btn btn-dark">Cancel</button>
          </div>
        </div>
      </div>

      <ToastContainer/>

      <LoadingDialog show={loading} />

      <AddCategory
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        onAddProduct={(category: Category) => {
          setCategoryId(category.id)
          setCategoryList([...categoryList, category])
        }}
      />

      <AddBrand
        show={showBrandModal}
        onHide={() => setShowBrandModal(false)}
        onAddBrand={(brand: Category) => {
          console.log(brand.id)
          setBrandId(brand.id)
          console.log(brandId)
          setBrandList([...brandList, brand])
        }}
      />
    </>
  )
}

export default AddProduct
