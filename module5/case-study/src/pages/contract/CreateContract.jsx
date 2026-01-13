import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Card, Button, Row, Col, Form as BsForm, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { createContract } from '../../service/contractService';
import { getAllEmployees } from '../../service/employeeService';
import { getAllCustomers } from '../../service/customerService';
import { getAllFacilities } from '../../service/facilityService';
import { toast } from 'react-toastify';

const CreateContract = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empData, custData, facData] = await Promise.all([
                    getAllEmployees(),
                    getAllCustomers(),
                    getAllFacilities()
                ]);
                setEmployees(empData);
                setCustomers(custData);
                setFacilities(facData);
            } catch (error) {
                toast.error("Không thể tải dữ liệu danh mục");
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, []);

    const initialValues = {
        startDate: '',
        endDate: '',
        deposit: '',
        employeeId: '',
        customerId: '',
        facilityId: ''
    };

    const validationSchema = Yup.object().shape({
        startDate: Yup.date()
            .required("Ngày bắt đầu không được để trống"),
        endDate: Yup.date()
            .required("Ngày kết thúc không được để trống")
            .min(Yup.ref('startDate'), "Ngày kết thúc phải sau ngày bắt đầu"),
        deposit: Yup.number()
            .required("Tiền đặt cọc không được để trống")
            .positive("Tiền đặt cọc phải là số dương"),
        employeeId: Yup.string().required("Vui lòng chọn nhân viên"),
        customerId: Yup.string().required("Vui lòng chọn khách hàng"),
        facilityId: Yup.string().required("Vui lòng chọn dịch vụ")
    });

    const handleSubmit = async (values) => {
        try {
            const dataToSubmit = {
                ...values,
                deposit: Number(values.deposit),
                employeeId: Number(values.employeeId),
                customerId: Number(values.customerId),
                facilityId: Number(values.facilityId)
            };
            await createContract(dataToSubmit);
            toast.success("Tạo hợp đồng mới thành công!");
            navigate('/contract');
        } catch (error) {
            toast.error("Tạo hợp đồng thất bại!");
        }
    };

    if (loadingData) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang tải dữ liệu biểu mẫu...</p>
            </div>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Header className="bg-premium-gradient text-white text-center py-4 border-0">
                            <h2 className="mb-0 fw-bold">Tạo Mới Hợp Đồng</h2>
                            <p className="mb-0 opacity-75">Vui lòng điền đủ thông tin hợp đồng</p>
                        </Card.Header>
                        <Card.Body className="p-4 p-md-5">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        <Row>
                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Ngày bắt đầu</BsForm.Label>
                                                <Field name="startDate" type="date" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="startDate" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Ngày kết thúc</BsForm.Label>
                                                <Field name="endDate" type="date" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="endDate" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Tiền đặt cọc (VND)</BsForm.Label>
                                                <Field name="deposit" type="number" className="form-control form-control-lg border-2" placeholder="Ví dụ: 1000000" />
                                                <ErrorMessage name="deposit" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Khách hàng</BsForm.Label>
                                                <Field name="customerId" as="select" className="form-select form-control-lg border-2 shadow-none shadow-sm">
                                                    <option value="">-- Chọn khách hàng --</option>
                                                    {customers.map(c => (
                                                        <option key={c.id} value={c.id.toString()}>{c.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="customerId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Dịch vụ</BsForm.Label>
                                                <Field name="facilityId" as="select" className="form-select form-control-lg border-2 shadow-none shadow-sm">
                                                    <option value="">-- Chọn dịch vụ --</option>
                                                    {facilities.map(f => (
                                                        <option key={f.id} value={f.id.toString()}>{f.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="facilityId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Nhân viên lập hợp đồng</BsForm.Label>
                                                <Field name="employeeId" as="select" className="form-select form-control-lg border-2 shadow-none shadow-sm">
                                                    <option value="">-- Chọn nhân viên --</option>
                                                    {employees.map(e => (
                                                        <option key={e.id} value={e.id.toString()}>{e.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="employeeId" component="div" className="text-danger small mt-1" />
                                            </Col>
                                        </Row>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <Button variant="light" className="px-5 rounded-pill fw-bold" onClick={() => navigate('/contract')}>
                                                Hủy
                                            </Button>
                                            <Button type="submit" className="btn-premium px-5 rounded-pill fw-bold">
                                                Tạo hợp đồng
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateContract;
