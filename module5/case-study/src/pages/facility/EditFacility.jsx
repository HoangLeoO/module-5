import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Card, Button, Row, Col, Form as BsForm, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { getFacilityTypes, getRentTypes, getFacilityById, updateFacility } from '../../service/facilityService';
import { toast } from 'react-toastify';

const FREE_SERVICES = ["Buffet sáng", "Nước uống", "Wifi", "Dọn phòng", "Xe đưa đón sân bay"];

const EditFacility = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [facilityTypes, setFacilityTypes] = useState([]);
    const [rentTypes, setRentTypes] = useState([]);
    const [facility, setFacility] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fTypes, rTypes, existingFacility] = await Promise.all([
                    getFacilityTypes(),
                    getRentTypes(),
                    getFacilityById(id)
                ]);
                setFacilityTypes(fTypes);
                setRentTypes(rTypes);

                const formattedFacility = {
                    ...existingFacility,
                    facilityTypeId: existingFacility.facilityTypeId.toString(),
                    rentTypeId: existingFacility.rentTypeId.toString(),
                    freeService: existingFacility.freeService ? existingFacility.freeService.split(", ") : []
                };
                setFacility(formattedFacility);
            } catch (error) {
                toast.error("Không thể tải thông tin dịch vụ");
                navigate('/facility');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Tên dịch vụ không được để trống")
            .matches(/^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀẢÃẠĐẾỀỂỄỆÊÍÌỈĨỊỐỒỔỖỘÔÓÒỎÕỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*(?: [A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀẢÃẠĐẾỀỂỄỆÊÍÌỈĨỊỐỒỔỖỘÔÓÒỎÕỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]*)*$/, "Tên dịch vụ phải viết hoa chữ cái đầu và không chứa số"),
        area: Yup.number()
            .required("Diện tích không được để trống")
            .positive("Diện tích phải là số dương"),
        cost: Yup.number()
            .required("Chi phí không được để trống")
            .positive("Chi phí phải là số dương"),
        maxPeople: Yup.number()
            .required("Số người không được để trống")
            .positive("Số người phải là số dương")
            .integer("Số người phải là số nguyên"),
        rentTypeId: Yup.string().required("Vui lòng chọn kiểu thuê"),
        facilityTypeId: Yup.string().required("Vui lòng chọn loại dịch vụ"),
        floors: Yup.number().when('facilityTypeId', {
            is: (val) => val === '1' || val === '2',
            then: (schema) => schema.required("Số tầng không được để trống").positive("Số tầng phải là số dương").integer("Số tầng phải là số nguyên")
        }),
        poolArea: Yup.number().when('facilityTypeId', {
            is: '1',
            then: (schema) => schema.required("Diện tích hồ bơi không được để trống").positive("Diện tích hồ bơi phải là số dương")
        })
    });

    const handleSubmit = async (values) => {
        try {
            const { facilityTypeId, rentTypeId, ...rest } = values;
            let dataToSubmit = {
                facilityTypeId: Number(facilityTypeId),
                rentTypeId: Number(rentTypeId),
                ...rest
            };

            if (facilityTypeId === '1') {
                delete dataToSubmit.freeService;
            } else if (facilityTypeId === '2') {
                delete dataToSubmit.poolArea;
                delete dataToSubmit.freeService;
            } else {
                dataToSubmit.freeService = Array.isArray(values.freeService) ? values.freeService.join(", ") : values.freeService;
                delete dataToSubmit.roomStandard;
                delete dataToSubmit.otherConvenience;
                delete dataToSubmit.poolArea;
                delete dataToSubmit.floors;
            }

            await updateFacility(id, dataToSubmit);
            toast.success("Cập nhật dịch vụ thành công!");
            navigate('/facility');
        } catch (error) {
            toast.error("Cập nhật dịch vụ thất bại!");
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Đang tải thông tin dịch vụ...</p>
            </div>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Header className="bg-premium-gradient text-white text-center py-4 border-0">
                            <h2 className="mb-0 fw-bold">Chỉnh Sửa Dịch Vụ</h2>
                            <p className="mb-0 opacity-75">Cập nhật thông tin cho dịch vụ {facility?.name}</p>
                        </Card.Header>
                        <Card.Body className="p-4 p-md-5">
                            <Formik
                                initialValues={facility}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize={true}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        <Row>
                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold">Loại dịch vụ</BsForm.Label>
                                                <Field name="facilityTypeId" as="select" className="form-select form-control-lg border-2 shadow-none shadow-sm" disabled>
                                                    {facilityTypes.map(type => (
                                                        <option key={type.id} value={type.id.toString()}>{type.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="facilityTypeId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Tên dịch vụ</BsForm.Label>
                                                <Field name="name" className="form-control form-control-lg border-2" placeholder="Ví dụ: Villa Beach Front" />
                                                <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Diện tích sử dụng (m²)</BsForm.Label>
                                                <Field name="area" type="number" className="form-control form-control-lg border-2" placeholder="Ví dụ: 250" />
                                                <ErrorMessage name="area" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Chi phí thuê (VND)</BsForm.Label>
                                                <Field name="cost" type="number" className="form-control form-control-lg border-2" placeholder="Ví dụ: 12000000" />
                                                <ErrorMessage name="cost" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={6} className="mb-4">
                                                <BsForm.Label className="fw-bold">Số lượng người tối đa</BsForm.Label>
                                                <Field name="maxPeople" type="number" className="form-control form-control-lg border-2" placeholder="Ví dụ: 10" />
                                                <ErrorMessage name="maxPeople" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <BsForm.Label className="fw-bold d-block">Kiểu thuê</BsForm.Label>
                                                <div className="d-flex flex-wrap gap-4 mt-2">
                                                    {rentTypes.map(type => (
                                                        <BsForm.Check
                                                            key={type.id}
                                                            type="radio"
                                                            id={`rentType-${type.id}`}
                                                            label={type.name}
                                                            name="rentTypeId"
                                                            value={type.id.toString()}
                                                            checked={values.rentTypeId === type.id.toString()}
                                                            onChange={() => setFieldValue("rentTypeId", type.id.toString())}
                                                            className="fw-medium"
                                                        />
                                                    ))}
                                                </div>
                                                <ErrorMessage name="rentTypeId" component="div" className="text-danger small mt-1" />
                                            </Col>

                                            {/* Villa & House Fields */}
                                            {(values.facilityTypeId === '1' || values.facilityTypeId === '2') && (
                                                <>
                                                    <Col md={6} className="mb-4">
                                                        <BsForm.Label className="fw-bold">Tiêu chuẩn phòng</BsForm.Label>
                                                        <Field name="roomStandard" className="form-control form-control-lg border-2" />
                                                    </Col>
                                                    <Col md={6} className="mb-4">
                                                        <BsForm.Label className="fw-bold">Số tầng</BsForm.Label>
                                                        <Field name="floors" type="number" className="form-control form-control-lg border-2" />
                                                        <ErrorMessage name="floors" component="div" className="text-danger small mt-1" />
                                                    </Col>
                                                    <Col md={12} className="mb-4">
                                                        <BsForm.Label className="fw-bold">Mô tả tiện nghi khác</BsForm.Label>
                                                        <Field name="otherConvenience" as="textarea" rows={3} className="form-control border-2" />
                                                    </Col>
                                                </>
                                            )}

                                            {/* Villa specific */}
                                            {values.facilityTypeId === '1' && (
                                                <Col md={12} className="mb-4">
                                                    <BsForm.Label className="fw-bold">Diện tích hồ bơi (m²)</BsForm.Label>
                                                    <Field name="poolArea" type="number" className="form-control form-control-lg border-2" />
                                                    <ErrorMessage name="poolArea" component="div" className="text-danger small mt-1" />
                                                </Col>
                                            )}

                                            {/* Room specific */}
                                            {values.facilityTypeId === '3' && (
                                                <Col md={12} className="mb-4">
                                                    <BsForm.Label className="fw-bold d-block">Dịch vụ miễn phí đi kèm</BsForm.Label>
                                                    <div className="d-flex flex-wrap gap-4 mt-2">
                                                        {FREE_SERVICES.map((service, index) => (
                                                            <BsForm.Check
                                                                key={index}
                                                                type="checkbox"
                                                                id={`freeService-${index}`}
                                                                label={service}
                                                                value={service}
                                                                checked={Array.isArray(values.freeService) && values.freeService.includes(service)}
                                                                onChange={(e) => {
                                                                    const { checked, value } = e.target;
                                                                    const currentArray = Array.isArray(values.freeService) ? values.freeService : [];
                                                                    const nextValue = checked
                                                                        ? [...currentArray, value]
                                                                        : currentArray.filter(v => v !== value);
                                                                    setFieldValue("freeService", nextValue);
                                                                }}
                                                                className="fw-medium"
                                                            />
                                                        ))}
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <Button variant="light" className="px-5 rounded-pill fw-bold" onClick={() => navigate('/facility')}>
                                                Hủy
                                            </Button>
                                            <Button type="submit" className="btn-premium px-5 rounded-pill fw-bold">
                                                Cập nhật dịch vụ
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

export default EditFacility;
