import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function AddPlayerModal({ show, handleClose,handleAdd,player,handleChange }) {


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới cầu thủ</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="id"
                            value={player.id}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mã cầu thủ</Form.Label>
                        <Form.Control
                            type="text"
                            name="playerCode"
                            value={player.playerCode}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tên cầu thủ</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={player.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthDate"
                            value={player.birthDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Giá trị chuyển nhượng (USD)</Form.Label>
                        <Form.Control
                            type="number"
                            name="transferValue"
                            value={player.transferValue}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Vị trí</Form.Label>
                        <Form.Control
                            type="text"
                            name="position"
                            value={player.position}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => {
                    handleAdd(player);
                }}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
