import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
    onHandleValue: (value: boolean) => void,
    message: string
}

const ConfirmModal = (props: Props) => {
    const {onHandleValue, message} = props;
    const handleClose = (value: boolean) => {
        onHandleValue(value);
    }

  return (
    <>

      <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{handleClose(false)}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose(true)}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;