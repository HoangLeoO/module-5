import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Card, Button, Row, Col, Form as BsForm, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { createEmployee, getPositions, getEducationDegrees, getDivisions } from '../../service/employeeBE';
import { toast } from 'react-toastify';

const CreateEmployee = () => {
    const navigate = useNavigate();
    const [positions, setPositions] = useState([]);
    const [educationDegrees, setEducationDegrees] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [pos, edu, div] = await Promise.all([
                    getPositions(),
                    getEducationDegrees(),
                    getDivisions()
                ]);
                setPositions(pos);
                setEducationDegrees(edu);
                setDivisions(div);
            } catch (error) {
                toast.error("Không thể tải thông tin danh mục");
            } finally {
                setLoadingData(false);
            }
        };
        fetchMetadata();
    }, []);

    const initialValues = {
        name: '',
        dob: '',
        idCard: '',
        salary: '',
        phone: '',
        email: '',
        address: '',
        positionId: '',
        educationDegreeId: '',
        divisionId: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Họ tên không được để trống")
            .matches(/^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀẢÃẠĐẾỀỂỄỆÊÍÌỈĨỊỐỒỔỖỘÔÓÒỎÕỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*(?: [A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀẢÃẠĐẾỀỂỄỆÊÍÌỈĨỊỐỒỔỖỘÔÓÒỎÕỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*)*$/, "Tên phải viết hoa chữ cái đầu mỗi từ"),
        dob: Yup.date()
            .required("Ngày sinh không được để trống")
            .max(new Date(), "Ngày sinh không hợp lệ"),
        idCard: Yup.string()
            .required("CMND không được để trống")
            .matches(/^[0-9]{9}$|^[0-9]{12}$/, "CMND phải là 9 hoặc 12 số"),
        salary: Yup.number()
            .required("Lương không được để trống")
            .min(1, "Lương phải là số dương"),
        phone: Yup.string()
            .required("Số điện thoại không được để trống")
            .matches(/^(090|091|\(84\)\+90|\(84\)\+91)[0-9]{7}$/, "Số điện thoại không đúng định dạng"),
        email: Yup.string()
            .required("Email không được để trống")
            .email("Email không đúng định dạng"),
        address: Yup.string().required("Địa chỉ không được để trống"),
        positionId: Yup.string().required("Vui lòng chọn vị trí"),
        educationDegreeId: Yup.string().required("Vui lòng chọn trình độ"),
        divisionId: Yup.string().required("Vui lòng chọn bộ phận")
    });

    const handleSubmit = async (values) => {
        try {
            const dataToSubmit = {
                ...values,
                salary: Number(values.salary),
                position: { id: Number(values.positionId) },
                educationDegree: { id: Number(values.educationDegreeId) },
                division: { id: Number(values.divisionId) }
            };
            // Xóa các trường ID phẳng để tránh nhầm lẫn cho Backend
            delete dataToSubmit.positionId;
            delete dataToSubmit.educationDegreeId;
            delete dataToSubmit.divisionId;

            await createEmployee(dataToSubmit);
            toast.success("Thêm mới nhân viên thành công!");
            navigate('/employee');
        } catch (error) {
            toast.error("Thêm mới thất bại!");
        }
    };

    if (loadingData) {
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
                <Col md={10} lg={9}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Header className="bg-premium-gradient text-white text-center py-4 border-0">
                            <h2 className="mb-0 fw-bold">Thêm Mới Nhân Viên</h2>
                            <p className="mb-0 opacity-75">Vui lòng nhập đầy đủ thông tin bên dưới</p>
                        </Card.Header>
                        <Card.Body className="p-4 p-md-5">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {() => (
                                    <Form>
                                        <Row>
                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Họ và Tên</BsForm.Label>
                                                <Field name="name" className="form-control form-control-lg border-2" placeholder="Nguyễn Văn A" />
                                                <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Ngày sinh</BsForm.Label>
                                                <Field name="dob" type="date" className="form-control form-control-lg border-2" />
                                                <ErrorMessage name="dob" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Số CMND</BsForm.Label>
                                                <Field name="idCard" className="form-control form-control-lg border-2" placeholder="123456789" />
                                                <ErrorMessage name="idCard" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Lương (VND)</BsForm.Label>
                                                <Field name="salary" type="number" className="form-control form-control-lg border-2" placeholder="10000000" />
                                                <ErrorMessage name="salary" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Số điện thoại</BsForm.Label>
                                                <Field name="phone" className="form-control form-control-lg border-2" placeholder="0905XXXXXX" />
                                                <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Email</BsForm.Label>
                                                <Field name="email" type="email" className="form-control form-control-lg border-2" placeholder="example@email.com" />
                                                <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={4} className="mb-4">
                                                <BsForm.Label className="fw-bold">Vị trí</BsForm.Label>
                                                <Field name="positionId" as="select" className="form-select form-control-lg border-2">
                                                    <option value="">-- Chọn vị trí --</option>
                                                    {positions.map(p => (
                                                        <option key={p.id} value={p.id.toString()}>{p.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="positionId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={4} className="mb-4">
                                                <BsForm.Label className="fw-bold">Trình độ</BsForm.Label>
                                                <Field name="educationDegreeId" as="select" className="form-select form-control-lg border-2">
                                                    <option value="">-- Chọn trình độ --</option>
                                                    {educationDegrees.map(e => (
                                                        <option key={e.id} value={e.id.toString()}>{e.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="educationDegreeId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={4} className="mb-4">
                                                <BsForm.Label className="fw-bold">Bộ phận</BsForm.Label>
                                                <Field name="divisionId" as="select" className="form-select form-control-lg border-2">
                                                    <option value="">-- Chọn bộ phận --</option>
                                                    {divisions.map(d => (
                                                        <option key={d.id} value={d.id.toString()}>{d.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="divisionId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Địa chỉ</BsForm.Label>
                                                <Field name="address" as="textarea" rows={2} className="form-control border-2" placeholder="Nhập địa chỉ cư trú" />
                                                <ErrorMessage name="address" component="div" className="text-danger small mt-1" />
                                            </Col>
                                        </Row>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <Button variant="light" className="px-5 rounded-pill fw-bold" onClick={() => navigate('/employee')}>
                                                Hủy
                                            </Button>
                                            <Button type="submit" className="btn-premium px-5 rounded-pill fw-bold">
                                                Lưu nhân viên
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

export default CreateEmployee;
