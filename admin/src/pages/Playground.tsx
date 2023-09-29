import React, { ChangeEvent, SyntheticEvent, useState } from "react"
import AddCategory from "../component/AddCategory"

type Props = {}

function Playground({}: Props) {
  const [showModal, setShowModal] = useState(false)

  const handleProductSubmit = (productData: any) => {
    // Xử lý dữ liệu sản phẩm ở đây
    console.log("Submitted Product Data:", productData)
  }

  return (
    <div>
      <h2>Add Product</h2>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <AddCategory
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddProduct={handleProductSubmit}
      />
    </div>
  )
}

export default Playground
