import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Table, Button, Container, Spinner, Badge } from "react-bootstrap";
import { deleteCustomer, getAllCustomers } from "../../service/customerService.js";
import { toast } from "react-toastify";
import DeleteModal from "../../components/common/DeleteModal";

export const ListCustomer = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await getAllCustomers();
            setCustomers(data);
        } catch (err) {
            toast.error("Không thể tải danh sách khách hàng");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDeleteClick = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteCustomer(selectedCustomer.id);
            toast.success(`Xóa ${selectedCustomer.name} thành công`);
            setShowModal(false);
            await fetchCustomers();
        } catch (err) {
            toast.error("Xóa thất bại");
        }
    };

    const getBadgeBg = (typeName) => {
        switch (typeName) {
            case 'Diamond':
                return 'primary';
            case 'Platinum':
                return 'info';
            case 'Gold':
                return 'warning';
            case 'Silver':
                return 'secondary';
            default:
                return 'light';
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="success" />
                <p className="mt-2 text-muted">Đang tải danh sách khách hàng...</p>
            </div>
        );
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-gradient mb-0">Quản lý Khách hàng</h2>
                    <p className="text-muted small">Thông tin khách hàng thân thiết của Furama</p>
                </div>
                <Button className="btn-premium" onClick={() => navigate('/customer/create')}>
                    <i className="bi bi-person-plus-fill me-2"></i>Thêm khách hàng mới
                </Button>
            </div>

            <div className="card shadow-sm border-0 overflow-hidden">
                <Table hover responsive className="mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="px-4 py-3 border-0">Họ tên</th>
                            <th className="py-3 border-0">Ngày sinh</th>
                            <th className="py-3 border-0">Giới tính</th>
                            <th className="py-3 border-0">Loại khách</th>
                            <th className="py-3 border-0">Địa chỉ</th>
                            <th className="py-3 border-0 text-end pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.id} className="align-middle">
                                <td className="px-4 py-3 border-bottom border-light">
                                    <div className="fw-bold text-primary">{c.name}</div>
                                    <div className="small text-muted">{c.phone}</div>
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {c.dob}
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {c.gender === 1 ? "Nam" : "Nữ"}
                                </td>
                                <td className="py-3 border-bottom border-light">
                                    <Badge bg={getBadgeBg(c.customerType?.name)} className="fw-normal px-3 py-2">
                                        {c.customerType?.name}
                                    </Badge>
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {c.address}
                                </td>
                                <td className="py-3 border-bottom border-light text-end pe-4">
                                    <Button
                                        variant="link"
                                        className="text-primary p-0 me-3"
                                        title="Sửa"
                                        onClick={() => navigate(`/customer/edit/${c.id}`)}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="text-danger p-0"
                                        title="Xóa"
                                        onClick={() => handleDeleteClick(c)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <DeleteModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={confirmDelete}
                itemName={selectedCustomer?.name}
            />
        </Container>
    );
};
