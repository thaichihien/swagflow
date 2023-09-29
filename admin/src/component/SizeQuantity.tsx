import React, { useEffect, useState } from "react"
import { SizeQuantity } from "../interfaces/size-quantity"
import { Size } from "../interfaces/size"
import { serverConfig } from "../config/env"

type Props = {
  onSizeAndQuantityChange: (value: SizeQuantity[]) => void
}

function SizeQuantitySection({ onSizeAndQuantityChange }: Props) {
  const defaultSize = 7
  const [sizeQuantityArray, setSizeQuantityArray] = useState<SizeQuantity[]>([
    {
      id: "",
      quantity: 0,
    },
  ])
  const [sizes, setSizes] = useState<Size[]>([])

  useEffect(() => {
    // - get size

    fetch(serverConfig.endpoint("/size"))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setSizes(data)
      })
      .catch((error) => {
        console.error(error)
      })

    // const sizeFromServer: Size[] = [
    //   {
    //     id: "5",
    //     name: "S",
    //   },
    //   {
    //     id: "6",
    //     name: "M",
    //   },
    //   {
    //     id: "7",
    //     name: "L",
    //   },
    //   {
    //     id: "8",
    //     name: "XL",
    //   },
    // ]
    // setSizes(sizeFromServer)
  }, [])

  function addMoreSize(): void {
    const newSizeQuantity: SizeQuantity = {
      id: "",
      quantity: 0,
    }
    setSizeQuantityArray([...sizeQuantityArray, newSizeQuantity])
  }

  function removeSize(index: number): void {
    setSizeQuantityArray((oldSizeQuantity) => {
      return oldSizeQuantity.filter((_, i: number) => index !== i)
    })
  }

  function handleSize(index: number, sizeId: string) {
    const newSizeQuantityArray = [...sizeQuantityArray]
    //console.log(newSizeQuantityArray)

    if (newSizeQuantityArray[index].id.length <= 0) {
      newSizeQuantityArray[index].id = sizes[0].id
    }
    newSizeQuantityArray[index].id = sizeId
    setSizeQuantityArray(newSizeQuantityArray)
    onSizeAndQuantityChange(newSizeQuantityArray)
  }

  function handleQuantity(index: number, quantity: number) {
    const newSizeQuantityArray = [...sizeQuantityArray]

    if (newSizeQuantityArray[index].id.length <= 0) {
      newSizeQuantityArray[index].id = sizes[0].id
    }
    newSizeQuantityArray[index].quantity = quantity
    setSizeQuantityArray(newSizeQuantityArray)
    onSizeAndQuantityChange(newSizeQuantityArray)
  }

  return (
    <>
      <div className="form-group">
        <div className="d-flex justify-content-between  align-items-center my-4">
          <label htmlFor="exampleInputName1">Size & Quantity</label>
          <button
            className="btn btn-sm btn-primary px-3 py-2"
            type="button"
            onClick={addMoreSize}
          >
            Add size
          </button>
        </div>

        {sizeQuantityArray.map((sizeQuantity, index: number) => (
          <div className="row" key={index}>
            <div className="col-md-4">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Size</label>
                <div className="col-sm-9">
                  <select
                    defaultValue={
                      sizeQuantity.id.length > 0 ? sizeQuantity.id : "7"
                    }
                    className="form-control"
                    id="exampleSelectGender"
                    onChange={(e) => handleSize(index, e.target.value)}
                  >
                    {sizes.map((size) => (
                      <option value={size.id}>{size.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Quantity</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={sizeQuantity.quantity}
                    onChange={(e) => handleQuantity(index, +e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-1">
              {index !== 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => removeSize(index)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SizeQuantitySection
