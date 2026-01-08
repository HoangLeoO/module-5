import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getAll, save} from "../service/customerService.js";

export default class AddCustomerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                id: "",
                name: ""
            }
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault(); // BẮT BUỘC
        save(this.state.formData);
        console.log(getAll());
        this.props.onAddSuccess(); //  QUAN TRỌNG
    };

    render() {
        const { id, name } = this.state.formData;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="id"
                        value={id}
                        onChange={this.handleChange}
                        placeholder="id"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        placeholder="your name"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}
