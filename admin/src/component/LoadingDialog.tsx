import React from "react"
import { Modal, Spinner } from "react-bootstrap"

type Props = {
  show: boolean
}

function LoadingDialog({ show }: Props) {
  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />;
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LoadingDialog
