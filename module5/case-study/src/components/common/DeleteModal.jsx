import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, handleConfirm, itemName }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
                Bạn có chắc chắn muốn xóa <strong>{itemName}</strong>?
                <p className="text-danger small mb-0 mt-2">Hành động này không thể hoàn tác.</p>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="light" className="rounded-pill px-4" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="danger" className="rounded-pill px-4" onClick={handleConfirm}>
                    Xác nhận xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
