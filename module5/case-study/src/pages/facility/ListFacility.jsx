import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Badge, Spinner, Container, Form } from "react-bootstrap";
import { getAllFacilities, deleteFacility, getFacilityTypes, searchFacilities } from "../../service/facilityService.js";
import { toast } from "react-toastify";
import DeleteModal from "../../components/common/DeleteModal";
import { Link } from "react-router";

export const ListFacility = () => {
    const [facilities, setFacilities] = useState([]);
    const [facilityTypes, setFacilityTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);


    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTypeId, setSelectedTypeId] = useState("");

    const fetchInitialData = async () => {
        try {
            const types = await getFacilityTypes();
            setFacilityTypes(types);
            await fetchFacilities();
        } catch (err) {
            console.error(err);
        }
    };

    const fetchFacilities = async (name = "", typeId = "") => {
        setLoading(true);
        try {
            const data = await searchFacilities(name, typeId);
            setFacilities(data);
        } catch (err) {
            toast.error("Không thể tải danh sách dịch vụ");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleDeleteClick = (facility) => {
        setSelectedFacility(facility);
        setShowModal(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFacilities(searchTerm, selectedTypeId);
    };

    const confirmDelete = async () => {
        try {
            await deleteFacility(selectedFacility.id);
            toast.success(`Xóa ${selectedFacility.name} thành công`);
            setShowModal(false);
            await fetchFacilities(searchTerm, selectedTypeId);
        } catch (err) {
            toast.error("Xóa thất bại");
        }
    };

    const getImageUrl = (type) => {
        switch (type) {
            case 'Villa': return 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80';
            case 'House': return 'https://images.unsplash.com/photo-1600585154340-be6161a46a0c?auto=format&fit=crop&w=800&q=80';
            default: return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80';
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Đang tải danh sách các địa điểm tuyệt vời...</p>
            </div>
        );
    }

    return (
        <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h2 className="fw-bold text-gradient mb-0">Quản lý Dịch vụ</h2>
                    <p className="text-muted small">Khám phá và quản lý không gian nghỉ dưỡng Furama</p>
                </div>
                <Link to="/facility/create">
                    <Button className="btn-premium">
                        <i className="bi bi-plus-lg me-2"></i>Thêm dịch vụ mới
                    </Button>
                </Link>
            </div>

            {/* Search Bar */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
                <Card.Body className="p-3">
                    <Form onSubmit={handleSearch}>
                        <Row className="g-3 align-items-end">
                            <Col md={5}>
                                <Form.Label className="small fw-bold">Tên dịch vụ</Form.Label>
                                <Form.Control
                                    placeholder="Nhập tên dịch vụ cần tìm..."
                                    className="border-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label className="small fw-bold">Loại dịch vụ</Form.Label>
                                <Form.Select
                                    className="border-2"
                                    value={selectedTypeId}
                                    onChange={(e) => setSelectedTypeId(e.target.value)}
                                >
                                    <option value="">-- Tất cả loại --</option>
                                    {facilityTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <div className="d-grid">
                                    <Button type="submit" variant="primary" className="fw-bold py-2 rounded-3 shadow-none">
                                        <i className="bi bi-search me-2"></i>Tìm kiếm
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            <Row className="g-4">
                {facilities.map((f) => (
                    <Col key={f.id} xs={12} md={6} lg={4}>
                        <Card className="card-hover h-100 overflow-hidden border-0">
                            <div className="position-relative">
                                <Card.Img
                                    variant="top"
                                    src={getImageUrl(f.facilityType?.name)}
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                                <Badge
                                    bg={f.facilityType?.name === 'Villa' ? 'primary' : f.facilityType?.name === 'House' ? 'info' : 'secondary'}
                                    className="position-absolute top-0 end-0 m-3 px-3 py-2"
                                >
                                    {f.facilityType?.name}
                                </Badge>
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="fw-bold h5 mb-3">{f.name}</Card.Title>
                                <div className="mb-3 small text-muted">
                                    <div className="d-flex align-items-center mb-1">
                                        <i className="bi bi-arrows-fullscreen me-2"></i>
                                        Diện tích: {f.area} m²
                                    </div>
                                    <div className="d-flex align-items-center mb-1">
                                        <i className="bi bi-currency-dollar me-2"></i>
                                        Chi phí: {new Intl.NumberFormat('vi-VN').format(f.cost)} VND
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-people me-2"></i>
                                        Số người tối đa: {f.maxPeople}
                                    </div>
                                </div>
                                <div className="mt-auto d-flex gap-2">
                                    <Link to={`/facility/edit/${f.id}`} className="flex-grow-1">
                                        <Button variant="outline-primary" size="sm" className="w-100 rounded-pill">
                                            <i className="bi bi-pencil-square me-1"></i> Sửa
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="flex-grow-1 rounded-pill"
                                        onClick={() => handleDeleteClick(f)}
                                    >
                                        <i className="bi bi-trash me-1"></i> Xóa
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <DeleteModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={confirmDelete}
                itemName={selectedFacility?.name}
            />
        </Container>
    );
};
