import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      >
      <Modal.Header closeButton>
        <Modal.Title >
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        {props.footer 
        ? props.footer 
        : <button
          onClick={props.onHide}
          className='btn btn-secondary btn__mengerti w-100 rounded-5 d-block fw-bold'>
          OKE, MENGERTI
        </button>
        }
      </Modal.Footer>
    </Modal>
  );
}