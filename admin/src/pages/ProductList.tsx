import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchProducts } from "../features/products/productSlide"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"

type Props = {}

function ProductList({}: Props) {
  const products = useAppSelector((state) => state.products.data)
  const err = useAppSelector((state) => state.products.error)
  const dispatch = useAppDispatch()

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "category",
      text: "Category",
    },
    {
      dataField: "brand",
      text: "Brand",
    },
    {
      dataField: "price",
      text: "Price",
      sort: true
    },
    {
      dataField: "createdAt",
      text: "Created time",
      formatter: (cell: any) => {
        let dateObj = cell
        if (typeof cell !== "object") {
          dateObj = new Date(cell)
        }
        return dateObj.toDateString()
        // return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
    },
  ]

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <div className="page-header">
        <h3 className="page-title"> {err} </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Tables</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Basic tables
            </li>
          </ol>
        </nav>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <main className="cd__main">
              {/* <!-- Start DEMO HTML (Use the following code into your project)--> */}

              <BootstrapTable
                keyField="id"
                data={products}
                columns={columns}
                pagination={paginationFactory({})}
                striped
              />
              {/* <table id="product-table" className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Created time</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>{product.price}</td>
                      <td>{new Date(product.createdAt).toDateString()}</td>  
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Created time</th>
                  </tr>
                </tfoot>
              </table> */}
              {/* <!-- END EDMO HTML (Happy Coding!)--> */}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList
