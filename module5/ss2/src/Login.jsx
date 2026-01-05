
import './Login.css';
export default function Login() {
    return (<>
        <div className="container login-container">
            <div className="row w-100 justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card p-4">
                        <div className="card-body">
                            <h3 className="text-center mb-4 fw-bold">ĐĂNG NHẬP</h3>

                            <form action="#" method="POST">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email hoặc Tên đăng nhập</label>
                                    <input type="email" className="form-control" id="email"
                                           placeholder="name@example.com" required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                                    <input type="password" className="form-control" id="password" placeholder="••••••••"
                                           required/>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="form-check">
                                        <input className="form-check-box" type="checkbox" id="rememberMe"/>
                                        <label className="form-check-label" htmlFor="rememberMe">Ghi nhớ</label>
                                    </div>
                                    <a href="#" className="text-decoration-none small">Quên mật khẩu?</a>
                                </div>

                                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Đăng nhập</button>
                            </form>

                            <div className="text-center mt-4">
                                <p className="mb-0">Chưa có tài khoản? <a href="#" className="text-decoration-none">Đăng
                                    ký ngay</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-3 text-muted">
                        <small>&copy; 2026 Bản quyền thuộc về Team Của Bạn</small>
                    </div>
                </div>
            </div>
        </div>
    </>)
}