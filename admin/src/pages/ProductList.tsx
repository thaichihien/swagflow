import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  Product,
  fetchProducts,
  updateProducts,
} from "../features/products/productSlide"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Link } from "react-router-dom"
import { Button, ToastContainer } from "react-bootstrap"
import { serverConfig } from "../config/env"
import { toast } from "react-toastify"
import { selectCurrentToken } from "../features/auth/authenticationSlice"

type Props = {}

function ProductList({}: Props) {
  const products = useAppSelector((state) => state.products.data)
  const err = useAppSelector((state) => state.products.error)
  const token = useAppSelector(selectCurrentToken)
  const dispatch = useAppDispatch()
  let table: BootstrapTable<any, number> | null

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      formatter: (cell: any, row: Product) => {
        return <Link to="">{cell}</Link>
      },
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
      sort: true,
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
    dispatch(fetchProducts(token))
  }, [dispatch])

  function handleSelectedProduct(id: string, isRemove: boolean) {
    if (isRemove) {
      const newSelectedArray = selectedItems.filter((item) => item !== id)
      setSelectedItems(newSelectedArray)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  async function handleDeleteProducts() {
    if (confirm(selectedItems.join(", "))) {
      let deletedUrl = serverConfig.endpoint("/product")
      const fetchOption: RequestInit = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
      const deleteProductsDto = {
        products : selectedItems
      }
      try {
        if (selectedItems.length === products.length) {
          deletedUrl += "?all=true"
          fetchOption.body = JSON.stringify({products : []})
          const res = await fetch(deletedUrl, fetchOption)
          if (res.ok) {
            dispatch(updateProducts([]))
          } else {
            console.log(res)
          }
        } else {
         
          fetchOption.body = JSON.stringify(deleteProductsDto)
          const res = await fetch(deletedUrl, fetchOption)
          if (res.ok) {
            let removeItems: string[] = selectedItems
            const newProductsList: Product[] = []
            for (let index = 0; index < products.length; index++) {
              const p = products[index]
              let isRemoved = ""
              for (let j = 0; j < removeItems.length; j++) {
                const removeP = removeItems[j]
                if (p.id == removeP) {
                  isRemoved = removeP
                  break
                }
              }

              if (isRemoved) {
                removeItems = removeItems.filter((i) => i !== isRemoved)
              } else {
                newProductsList.push(p)
              }
            }

            dispatch(updateProducts(newProductsList))
          }else {
            console.log(res)
          }
        }
      } catch (error) {
        console.log(error)
        toast.error("delete error")
      }
    }
  }

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
          <div className="d-flex justify-content-between mb-4">
            <div>
              Select {selectedItems.length} of {products.length}
            </div>
            <div>
              <Button className="btn-danger" onClick={handleDeleteProducts}>
                Delete
              </Button>
            </div>
          </div>

          <BootstrapTable
            keyField="id"
            selectRow={{
              mode: "checkbox",
              clickToSelect: true,
              onSelect(row: Product, isSelected, rowIndex, e) {
                if (isSelected) {
                  handleSelectedProduct(row.id, false)
                } else {
                  handleSelectedProduct(row.id, true)
                }
              },
              onSelectAll(isSelect, rows, e) {
                if (isSelect) {
                  setSelectedItems(products.map((item) => item.id))
                } else {
                  setSelectedItems([])
                }
              },
            }}
            data={products}
            columns={columns}
            pagination={paginationFactory({})}
            striped
          />
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default ProductList
