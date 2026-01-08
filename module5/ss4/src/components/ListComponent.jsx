import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {addPlayer, deletePlayerById, getAll} from "../service/DataService.js";
import {DeleteComponent} from "./DeleteComponent.jsx";
import AddPlayerModal from "./AddPlayerModal.jsx";

const ListComponent = () => {
    const [data, setData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showAddModal, setShowAddModal] = useState(null);
    const [player, setPlayer] = useState({
        id: "",
        playerCode: "",
        name: "",
        birthDate: "",
        transferValue: "",
        position: ""
    });
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        setData(getAll());
    }, []);

    const handleShowModalDelete = (player) => {
        setShowDeleteModal(true);
        setSelectedPlayer(player);
    };

    const handleShowModalAdd = () => {
        setShowAddModal(true);
    }

    const handleClose = () => {
        setShowDeleteModal(false);
        setShowAddModal(false);
    }

    const handleDelete = (id) => {
        deletePlayerById(id);               // xóa trong service
        setData(getAll());        // load lại danh sách
        setShowDeleteModal(false);
        setSelectedPlayer(null);
    };

    const handleAdd = (player) => {
        addPlayer(player);
        setData(getAll());
        setShowAddModal(false);
        setPlayer(
            {
                id: "",
                playerCode: "",
                name: "",
                birthDate: "",
                transferValue: "",
                position: ""
            }
        )
    }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setPlayer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredData = data.filter(e =>
        e.name.toLowerCase().includes(keyword.toLowerCase())
    );

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
                                <button className="btn btn-sm btn-warning me-1">Sửa</button>
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
        <DeleteComponent showDeleteModal={showDeleteModal}
                         selectedPlayer={selectedPlayer}
                         onClose={handleClose}
                         onConfirm={handleDelete}
        />
        <AddPlayerModal show={showAddModal}
                        handleClose={handleClose}
                        handleAdd={handleAdd}
                        handleChange={handleChange}
                        player={player}
        />
    </>);
};

export default ListComponent;