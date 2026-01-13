import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Table, Button, Container, Spinner, Badge } from "react-bootstrap";
// import { getAllEmployees } from "../../service/employeeService.js";
import { getAllEmployees } from "../../service/employeeBE.js";
import { toast } from "react-toastify";
import DeleteModal from "../../components/common/DeleteModal";

export const ListEmployee = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await getAllEmployees();
            setEmployees(data.content || data);
        } catch (err) {
            toast.error("Không thể tải danh sách nhân viên");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        toast.info("Chức năng xóa sẽ được triển khai ở bước sau");
        setShowModal(false);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Đang tải danh sách nhân viên...</p>
            </div>
        );
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-gradient mb-0">Quản lý Nhân viên</h2>
                    <p className="text-muted small">Xem và quản lý thông tin đội ngũ nhân sự</p>
                </div>
                <Button className="btn-premium" onClick={() => navigate('/employee/create')}>
                    <i className="bi bi-person-plus me-2"></i>Thêm nhân viên mới
                </Button>
            </div>

            <div className="card shadow-sm border-0 overflow-hidden">
                <Table hover responsive className="mb-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="px-4 py-3 border-0">Họ và Tên</th>
                            <th className="py-3 border-0">Vị trí</th>
                            <th className="py-3 border-0">Bộ phận</th>
                            <th className="py-3 border-0">Số điện thoại</th>
                            <th className="py-3 border-0 text-end pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((e) => (
                            <tr key={e.id} className="align-middle">
                                <td className="px-4 py-3 border-bottom border-light">
                                    <div className="fw-bold">{e.name}</div>
                                    <div className="small text-muted">{e.email}</div>
                                </td>
                                <td className="py-3 border-bottom border-light">
                                    <Badge bg="info" className="fw-normal">{e.position?.name}</Badge>
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {e.division?.name}
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {e.phone}
                                </td>
                                <td className="py-3 border-bottom border-light text-end pe-4">
                                    <Button variant="link" className="text-primary p-0 me-3" title="Sửa">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button
                                        variant="link"
                                        className="text-danger p-0"
                                        title="Xóa"
                                        onClick={() => handleDeleteClick(e)}
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
                itemName={selectedEmployee?.name}
            />
        </Container>
    );
};
