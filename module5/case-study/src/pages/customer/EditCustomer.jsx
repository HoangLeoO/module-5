import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Card, Button, Row, Col, Form as BsForm, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { getCustomerById, updateCustomer, getAllCustomerTypes } from '../../service/customerService';
import { toast } from 'react-toastify';

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customerTypes, setCustomerTypes] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [types, customerData] = await Promise.all([
                    getAllCustomerTypes(),
                    getCustomerById(id)
                ]);
                setCustomerTypes(types);
                setCustomer(customerData);
            } catch (error) {
                toast.error("Không thể tải thông tin khách hàng");
                navigate('/customer');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Họ tên không được để trống")
            .matches(/^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀẢÃẠĐẾỀỂỄỆÊÍÌỈĨỊỐỒỔỖỘÔÓÒỎÕỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*(?: [A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀẢÃẠĐẾỀỂỄỆÊÍÌỈĨỊỐỒỔỖỘÔÓÒỎÕỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*)*$/, "Họ tên phải viết hoa chữ cái đầu của mỗi từ"),
        dob: Yup.date()
            .required("Ngày sinh không được để trống")
            .test("age-check", "Khách hàng phải từ 18 tuổi trở lên", (value) => {
                if (!value) return false;
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age >= 18;
            })
            .max(new Date(), "Ngày sinh không thể ở tương lai"),
        idCard: Yup.string()
            .required("Số CMND không được để trống")
            .matches(/^[0-9]{9}$|^[0-9]{12}$/, "Số CMND phải có 9 hoặc 12 chữ số"),
        phone: Yup.string()
            .required("Số điện thoại không được để trống")
            .matches(/^(090|091|\(84\)\+90|\(84\)\+91)[0-9]{7}$/, "Số điện thoại phải đúng định dạng 090xxxxxxx hoặc 091xxxxxxx hoặc (84)+90xxxxxxx hoặc (84)+91xxxxxxx"),
        email: Yup.string()
            .required("Email không được để trống")
            .email("Email không đúng định dạng"),
        address: Yup.string().required("Địa chỉ không được để trống"),
        customerTypeId: Yup.string().required("Vui lòng chọn loại khách hàng")
    });

    const handleSubmit = async (values) => {
        try {
            const dataToSubmit = {
                ...values,
                gender: Number(values.gender),
                customerTypeId: Number(values.customerTypeId)
            };
            await updateCustomer(id, dataToSubmit);
            toast.success("Cập nhật thông tin khách hàng thành công!");
            navigate('/customer');
        } catch (error) {
            toast.error("Cập nhật thất bại!");
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Header className="bg-premium-gradient text-white text-center py-4 border-0">
                            <h2 className="mb-0 fw-bold">Chỉnh Sửa Khách Hàng</h2>
                            <p className="mb-0 opacity-75">Cập nhật thông tin chi tiết</p>
                        </Card.Header>
                        <Card.Body className="p-4 p-md-5">
                            <Formik
                                initialValues={{
                                    ...customer,
                                    customerTypeId: customer.customerTypeId?.toString() || ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize={true}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        <Row>
                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Họ tên</BsForm.Label>
                                                <Field name="name" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Ngày sinh</BsForm.Label>
                                                <Field name="dob" type="date" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="dob" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold d-block">Giới tính</BsForm.Label>
                                                <div className="d-flex gap-4 mt-2">
                                                    <BsForm.Check
                                                        type="radio"
                                                        id="gender-male"
                                                        label="Nam"
                                                        name="gender"
                                                        value="1"
                                                        checked={Number(values.gender) === 1}
                                                        onChange={() => setFieldValue("gender", 1)}
                                                        className="fw-medium"
                                                    />
                                                    <BsForm.Check
                                                        type="radio"
                                                        id="gender-female"
                                                        label="Nữ"
                                                        name="gender"
                                                        value="0"
                                                        checked={Number(values.gender) === 0}
                                                        onChange={() => setFieldValue("gender", 0)}
                                                        className="fw-medium"
                                                    />
                                                </div>
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Loại khách hàng</BsForm.Label>
                                                <Field name="customerTypeId" as="select" className="form-select form-control-lg border-2">
                                                    <option value="">-- Chọn loại khách --</option>
                                                    {customerTypes.map(type => (
                                                        <option key={type.id} value={type.id.toString()}>{type.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="customerTypeId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Số CMND</BsForm.Label>
                                                <Field name="idCard" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="idCard" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Số điện thoại</BsForm.Label>
                                                <Field name="phone" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Email</BsForm.Label>
                                                <Field name="email" type="email" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Địa chỉ</BsForm.Label>
                                                <Field name="address" as="textarea" rows={2} className="form-control border-2" />
                                                <ErrorMessage name="address" component="div" className="text-danger small mt-1" />
                                            </Col>
                                        </Row>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <Button variant="light" className="px-5 rounded-pill fw-bold" onClick={() => navigate('/customer')}>
                                                Hủy
                                            </Button>
                                            <Button type="submit" className="btn-premium px-5 rounded-pill fw-bold">
                                                Cập nhật
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

export default EditCustomer;
