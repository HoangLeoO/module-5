import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkLogin } from "../redux/action.js";
import { useDispatch } from "react-redux";

const loginSchema = Yup.object({
    username: Yup.string().required("Không được để trống"),
    password: Yup.string().required("Không được để trống"),
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (values) => {
        try {
            const isLoginSuccess = await dispatch(checkLogin(values));

            if (isLoginSuccess) {
                toast.success("Đăng nhập thành công");
                navigate("/");
            } else {
                toast.error("Sai mật khẩu");
            }
        } catch (error) {
            toast.error("Sai tài khoản hoặc mật khẩu");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h3 className="text-center mb-4">Đăng nhập</h3>

            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div className="mb-3">
                        <label>Tài khoản</label>
                        <Field
                            name="username"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="username"
                            component="small"
                            className="text-danger"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Mật khẩu</label>
                        <Field
                            type="password"
                            name="password"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="password"
                            component="small"
                            className="text-danger"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Đăng nhập
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
