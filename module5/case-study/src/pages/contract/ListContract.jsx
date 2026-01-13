import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Table, Button, Container, Spinner, Badge } from "react-bootstrap";
import { getAllContracts } from "../../service/contractService.js";
import { toast } from "react-toastify";

export const ListContract = () => {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const contractData = await getAllContracts();
            setContracts(contractData);
        } catch (err) {
            toast.error("Không thể tải danh sách hợp đồng");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="info" />
                <p className="mt-2 text-muted">Đang tải danh sách hợp đồng...</p>
            </div>
        );
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-gradient mb-0">Quản lý Hợp đồng</h2>
                    <p className="text-muted small">Danh sách các hợp đồng thuê dịch vụ tại resort</p>
                </div>
                <Button className="btn-premium" onClick={() => navigate('/contract/create')}>
                    <i className="bi bi-file-earmark-plus me-2"></i>Tạo hợp đồng mới
                </Button>
            </div>

            <div className="card shadow-sm border-0 overflow-hidden">
                <Table hover responsive className="mb-0">
                    <thead className="bg-light text-uppercase small fw-bold">
                        <tr>
                            <th className="px-4 py-3 border-0">Khách hàng</th>
                            <th className="py-3 border-0">Dịch vụ</th>
                            <th className="py-3 border-0">Nhân viên lập</th>
                            <th className="py-3 border-0">Ngày bắt đầu</th>
                            <th className="py-3 border-0">Ngày kết thúc</th>
                            <th className="py-3 border-0">Tiền đặt cọc</th>
                            <th className="py-3 border-0 text-end pe-4">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract) => (
                            <tr key={contract.id} className="align-middle">
                                <td className="px-4 py-3 border-bottom border-light fw-bold">
                                    {contract.customer?.name}
                                </td>
                                <td className="py-3 border-bottom border-light">
                                    <Badge bg="secondary" className="fw-normal">{contract.facility?.name}</Badge>
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {contract.employee?.name}
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {contract.startDate}
                                </td>
                                <td className="py-3 border-bottom border-light text-muted">
                                    {contract.endDate}
                                </td>
                                <td className="py-3 border-bottom border-light">
                                    {formatCurrency(contract.deposit)}
                                </td>
                                <td className="py-3 border-bottom border-light text-end pe-4 fw-bold text-success">
                                    {formatCurrency(contract.deposit * 3)} {/* Tạm tính tổng tiền */}
                                </td>
                            </tr>
                        ))}
                        {contracts.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-muted">
                                    Chưa có hợp đồng nào được tạo.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};
