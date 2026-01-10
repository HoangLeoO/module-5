import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Modal } from "react-bootstrap";

export const DeleteComponent = (props) => {


    const handleClose = () => {
        props.onClose();
    }
    return (
        <>
            <Modal
                show={props.showDeleteModal}
                onHide={handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this player is <span>{
                        props.selectedPlayer?.name
                    }?</span>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => props.onConfirm(props.selectedPlayer.id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}