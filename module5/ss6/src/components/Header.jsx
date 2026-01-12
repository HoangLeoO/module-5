import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/action.js";


const Header = () => {
    const { account } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Navbar expand="lg" bg="light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Player Manager
                </Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Danh sách cầu thủ
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        {!account && (
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                        )}

                        {account && (
                            <>
                                <Nav.Link disabled>
                                    {account.username}
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
