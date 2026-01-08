import {Component} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {deleteByCustomer, getAll} from "../service/customerService.js";

export default class DeleteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClose = () => {
        this.props.handleCloseModal();

    };

    handleDelete = () => {
        deleteByCustomer(this.props.deleteCustomer)
        console.log(getAll())
        this.handleClose();
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.isShowModal}
                    onHide={this.handleClose}
                    animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you sure you want to delete this customer is <span>{
                        this.props.deleteCustomer?.name
                    }?</span>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
