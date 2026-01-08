import { useEffect, useState } from "react";
import { getAll, deletePlayerById } from "../service/DataService.js";
import { Link, useNavigate } from "react-router-dom";
import { DeletePlayer } from "./DeletePLayer.jsx";
import { toast } from "react-toastify";

export const Home = () => {
    const [dataList, setDataList] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const navigate = useNavigate();

    const loadData = () => {
        setDataList([...getAll()]);
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredData = dataList.filter(e => e.name.toLowerCase().includes(keyword.toLowerCase()));

    function handleShowModalAdd() {
        navigate("/add");
    }

    const handleShowModalDelete = (player) => {
        setSelectedPlayer(player);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPlayer(null);
    };

    const handleConfirmDelete = (id) => {
        deletePlayerById(id);
        toast.success("Xóa cầu thủ thành công!");
        handleCloseModal();
        loadData();
    };

    return (<>
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Danh sách cầu thủ bóng đá</h3>

                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm theo mã, tên, vị trí..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleShowModalAdd}
                    >
                        Thêm mới
                    </button>
                </div>
            </div>

            <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Mã cầu thủ</th>
                        <th>Tên</th>
                        <th>Ngày sinh</th>
                        <th>Giá trị chuyển nhượng</th>
                        <th>Vị trí</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map(e => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.playerCode}</td>
                                <td>{e.name}</td>
                                <td>{e.birthDate}</td>
                                <td>{e.transferValue}</td>
                                <td>{e.position}</td>
                                <td>
                                    <Link className="btn btn-sm btn-warning me-1" to={`/edit/${e.id}`}>Sửa</Link>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleShowModalDelete(e)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        <DeletePlayer
            show={showModal}
            player={selectedPlayer}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmDelete}
        />
    </>);
};