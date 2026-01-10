import { Button, Modal } from "react-bootstrap";

export const DeletePlayer = ({ show, player, handleClose, handleConfirm }) => {
    if (!player) return null;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Bạn có chắc chắn muốn xóa cầu thủ <strong>{player.name}</strong> (Mã: {player.playerCode}) không?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={() => handleConfirm(player.id)}>
                    Xác nhận xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};