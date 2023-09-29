import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { Category } from "../interfaces/category"

type Props = {
  show: boolean
  onHide: () => void
  onAddProduct: (category: any) => void
}

export default function AddCategory({ show, onHide, onAddProduct }: Props) {
  const [category, setCategory] = useState("")

  const handleAddProduct = () => {
   
    // - send category name to server

    const productData :Category = {
      id: "newCategory",
      name: category
    }
    onAddProduct(productData)    
    setCategory("")
    onHide()
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header >
        <Modal.Title>Add new category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
