import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { playerSchema } from "../validation/playerSchema.jsx";
import { addPlayer, findPlayerById, updatePlayer } from "../service/DataService.js";
import { toast } from "react-toastify";

const EditPlayer = () => {
    const [newPlayer, setNewPlayer] = useState({
        id: "",
        playerCode: "",
        name: "",
        birthDate: "",
        transferValue: "",
        position: ""
    });

    const { id } = useParams();

    useEffect(() => {
        const player = findPlayerById(+id);
        setNewPlayer(player);
    }, [id]);

    const navigate = useNavigate();
    const handleSubmit = (values) => {
        updatePlayer(+id, values);
        toast.success("Chỉnh sửa cầu thủ thành công");
        navigate("/");
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
                    <Field type="hidden" name="id" />
                    <div className="mb-3">
                        <label>Mã cầu thủ</label>
                        <Field name="playerCode" className="form-control" />
                        <ErrorMessage name="playerCode" component="small" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label>Tên</label>
                        <Field name="name" className="form-control" />
                        <ErrorMessage name="name" component="small" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label>Ngày sinh</label>
                        <Field type="date" name="birthDate" className="form-control" />
                        <ErrorMessage name="birthDate" component="small" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label>Giá trị chuyển nhượng</label>
                        <Field type="number" name="transferValue" className="form-control" />
                        <ErrorMessage name="transferValue" component="small" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label>Vị trí</label>
                        <Field as="select" name="position" className="form-control">
                            <option value="">-- Chọn vị trí --</option>
                            <option value="Tiền đạo">Tiền đạo</option>
                            <option value="Tiền vệ">Tiền vệ</option>
                            <option value="Hậu vệ">Hậu vệ</option>
                            <option value="Thủ môn">Thủ môn</option>
                        </Field>
                        <ErrorMessage name="position" component="small" className="text-danger" />
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
