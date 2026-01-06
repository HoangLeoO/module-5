import {Component} from "react";
import {Table} from "react-bootstrap";
import {getAll} from "../service/customerService.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import DeleteComponent from "./DeleteComponent.jsx";
import AddCustomerComponent from "./AddCustomerComponent.jsx";


export default class ListCustomerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCustomer: [],
            isShowModal: false,
            deleteCustomer: {
                id: null,
                name: ""
            }
        };
    }

    reloadCustomerList = () => {
        this.setState({
            listCustomer: [...getAll()]
        });
    };

    componentDidMount() {
        const data = [...getAll()];
        if (!data) return;

        this.setState({
            listCustomer: data
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.isShowModal != this.state.isShowModal) {
            this.setState({
                listCustomer: [...getAll()]
            })
        }
    }

    handleShowModalDelete = (customer) => {
        this.setState({
            isShowModal: true,
            deleteCustomer: customer
        });
    };

    handleCloseModal = () => {
        this.setState({
            isShowModal: false
        });
    };

    render() {
        return (
            <>
                <AddCustomerComponent
                    onAddSuccess={this.reloadCustomerList}
                />
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.listCustomer.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => this.handleShowModalDelete(e)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <DeleteComponent
                    isShowModal={this.state.isShowModal}
                    deleteCustomer={this.state.deleteCustomer}
                    handleCloseModal={this.handleCloseModal}
                />

            </>
        );
    }
}
