import React from 'react'
import { Button, Modal } from 'react-bootstrap'

type Props = {
    show : boolean
    title: string
    message: string
    onHide: () => void
}

function NotificationDialog({show,title,message,onHide}: Props) {
    return (
        <Modal show={show}>
          <Modal.Header >
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
}

export default NotificationDialog