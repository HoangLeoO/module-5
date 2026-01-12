import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {playerSchema} from "../validation/playerSchema.jsx";
import {editPlayer, findByIdPlayer} from "../service/playerService.js";
import {toast} from "react-toastify";
import {findPositionById, getAllPosition} from "../service/positionService.js";

const EditPlayer = () => {
    const [positions, setPositions] = useState([]);
    const [newPlayer, setNewPlayer] = useState({
        id: 0,
        playerCode: "",
        name: "",
        birthDate: "",
        transferValue: "",
        position: ""
    });

    const {id} = useParams();

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const data = await getAllPosition();
                setPositions(data);
            } catch (e) {
                console.log("Lỗi load position");
            }
        };
        fetchPositions();
    }, []);


    useEffect(() => {
        const fetchPlayer = async () => {
            const player = await findByIdPlayer(+id);
            setNewPlayer(player);
        };
        fetchPlayer();
    }, [id]);

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const position = await findPositionById(values.position);

            const player = {
                ...values,
                position: position
            };

            await editPlayer(+values.id, player);

            toast.success("Chỉnh sửa cầu thủ thành công");
            navigate("/");
        } catch (e) {
            toast.error("Chỉnh sửa cầu thủ không thành công");
            console.error(e);
        }
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={newPlayer}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
                validationSchema={playerSchema}
            >
                <Form>
                    <Field readOnly name="id"/>
                    <div className="mb-3">
                        <label>Mã cầu thủ</label>
                        <Field readOnly name="playerCode" className="form-control"/>
                        <ErrorMessage name="playerCode" component="small" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label>Tên</label>
                        <Field name="name" className="form-control"/>
                        <ErrorMessage name="name" component="small" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label>Ngày sinh</label>
                        <Field type="date" name="birthDate" className="form-control"/>
                        <ErrorMessage name="birthDate" component="small" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label>Giá trị chuyển nhượng</label>
                        <Field type="number" name="transferValue" className="form-control"/>
                        <ErrorMessage name="transferValue" component="small" className="text-danger"/>
                    </div>

                    <div className="mb-3">
                        <label>Vị trí</label>
                        <Field as="select" name="position" className="form-control">
                            <option value="">-- Chọn vị trí --</option>
                            {positions.map(pos => (
                                <option key={pos.id} value={pos.id}>
                                    {pos.name}
                                </option>
                            ))}
                        </Field>

                        <ErrorMessage name="position" component="small" className="text-danger"/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Chỉnh sửa
                    </button>
                </Form>
            </Formik>
        </>
    );
};

export default EditPlayer;
