import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {playerSchema} from "../validation/playerSchema.jsx";
import {addPlayer} from "../service/DataService.js";
import {toast} from "react-toastify";

const AddPlayerPage = ({player, handleChange, handleAdd}) => {
    const [newPlayer, setNewPlayer] = useState({
        id: "",
        playerCode: "",
        name: "",
        birthDate: "",
        transferValue: "",
        position: ""
    });
    const navigate = useNavigate();
    const handleSubmit = (values) => {

        console.log({...values, id: Date.now()});
        addPlayer(values);
        toast.success("Thêm cầu thủ thành công");
        navigate("/");

    };
    return (
        <>
            <Formik initialValues={newPlayer} onSubmit={(values) => {
                handleSubmit(values)
            }} validationSchema={playerSchema}>
                <Form>
                    <div className="mb-3">
                        <label>Mã cầu thủ</label>
                        <Field name="playerCode" className="form-control"/>
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
                            <option value="Tiền đạo">Tiền đạo</option>
                            <option value="Tiền vệ">Tiền vệ</option>
                            <option value="Hậu vệ">Hậu vệ</option>
                            <option value="Thủ môn">Thủ môn</option>
                        </Field>
                        <ErrorMessage name="position" component="small" className="text-danger"/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Thêm mới
                    </button>
                </Form>
            </Formik>
        </>
    );
};

export default AddPlayerPage;
