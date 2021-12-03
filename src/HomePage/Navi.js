import React, { useContext } from "react";
import "./Navi.css";
import Button from "react-bootstrap/Button";
import { useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import img from "../img/product_single_10.jpg";
import img1 from "../img/product_single_09.jpg";
import Cart from "../components/Cart/Cart.js";
import { UpCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import {
	CAvatar,
	CBadge,
	CDropdown,
	CDropdownDivider,
	CDropdownHeader,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle,
} from "@coreui/react";
import { AuthContext } from "../Context/AuthContext";
const Navi = () => {
	const history = useHistory();
	const [show, setShow] = React.useState("none");
	const showCart = () => {
		console.log("show cart");
		if (show === "none") {
			setShow("block");
		}
	};
	const hide = () => {
		setShow("none");
	};
	const {
		authState: { user },
	} = useContext(AuthContext);
	const { logout } = useContext(AuthContext);
	const carts = useSelector((state) => state.carts.cartDummy);
	const Clicklogout = () => {
		logout();
		history.push("/login");
	};
	const clickHistory = () => {
		history.push("/orderhistory");
	};
	const clickProfile = () => {
		history.push("/profile");
	};

	return (
		<>
			<Navbar bg="light" variant="light">
				<Container className="my-3">
					<Navbar.Brand href="#home">
						<div
							id="logo"
							className="text-success"
							style={{ fontSize: 30 }}
						>
							E-Commerce
						</div>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />

					<Navbar.Collapse>
						<Nav className="me-auto">
							<Nav.Link
								className="ml-3"
								style={{ marginLeft: 70 }}
								to="/"
								as={Link}
							>
								Home
							</Nav.Link>
							<Nav.Link
								className="nav navbar-nav d-flex justify-content-between mx-lg-auto"
								to="/about"
								as={Link}
							>
								About
							</Nav.Link>
							<Nav.Link to="/shop" as={Link}>
								Shop
							</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link to="/login" as={Link}>
								Login
							</Nav.Link>
							<Nav.Link eventKey={2} to="/admin/categories" as={Link}>
								Logout
							</Nav.Link>

							<Nav.Link
								className="nav-icon d-none d-lg-inline"
								href="#"
								data-bs-toggle="modal"
								data-bs-target="#templatemo_search"
							>
								<i className="fa fa-fw fa-search text-dark mr-2" />
							</Nav.Link>
							<div
								style={{ marginTop: 8 }}
								className="nav-icon position-relative text-decoration-none button-cart"
								onClick={showCart}
							>
								<i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
								<span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
									{/* {carts.length===0?"":carts.length} */}
									{carts?.length}
								</span>
								<div
									className="shopping-cart-content "
									style={{ display: show }}
								>
									{/* <i class="fas fa-times icon"></i> */}
									{/* <UpCircleOutlined
										style={{ backgroundColor: "#59ab6e" }}
										className="icon mb-2 btn btn-succsess"
										onClick={hide}
									/> */}
									<div
										style={{ width: "fit-content", marginLeft: 25 }}
										onClick={hide}
										className="ml-1 bg-info rounded-circle px-2 py-1 mt-2 text-white "
									>
										<i className="fas fa-chevron-up"></i>
									</div>
									<Cart></Cart>
								</div>
							</div>
							<Nav.Link
								className="nav-icon position-relative text-decoration-none"
								href="#"
							>
								{/* <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
									+99
								</span> */}
								{/* <i className="fa fa-fw fa-user text-dark mr-3" /> */}
								<CDropdown variant="nav-item">
									<CDropdownToggle
										placement="bottom-end"
										className="py-0"
										caret={false}
									>
										<CAvatar src={user?.avatar} size="md" />
									</CDropdownToggle>
									<CDropdownMenu
										className="pt-0"
										placement="bottom-end"
									>
										{/* <CDropdownHeader className="bg-light fw-semibold py-2">
											<Link to="/shop"> Account</Link>
										</CDropdownHeader>
										<CDropdownItem href="#">
											
											Updates
											<CBadge color="info" className="ms-2">
												42
											</CBadge>
										</CDropdownItem>
										<CDropdownItem href="#">
										
											Messages
											<CBadge color="success" className="ms-2">
												42
											</CBadge>
										</CDropdownItem>
										<CDropdownItem href="#">
											
											Tasks
											<CBadge color="danger" className="ms-2">
												42
											</CBadge>
										</CDropdownItem>
										<CDropdownItem href="#">
											
											Comments
											<CBadge color="warning" className="ms-2">
												42
											</CBadge>
										</CDropdownItem> */}
										<CDropdownHeader className="bg-light fw-semibold py-2">
											Settings
										</CDropdownHeader>
										<CDropdownItem
											href="#"
											as={Button}
											onClick={() => clickProfile()}
										>
											{/* <CIcon icon={cilUser} className="me-2" /> */}
											Profile
										</CDropdownItem>

										<CDropdownItem
											href="#"
											as={Button}
											onClick={() => clickHistory()}
										>
											{/* <CIcon icon={cilCreditCard} className="me-2" /> */}
											History
											<CBadge color="secondary" className="ms-2">
												1
											</CBadge>
										</CDropdownItem>
										{/* <CDropdownItem href="#">
											
											Log out
											<CBadge color="primary" className="ms-2">
												42
											</CBadge>
										</CDropdownItem> */}
										<CDropdownDivider />
										<CDropdownItem
											href="#"
											as={Button}
											onClick={() => Clicklogout()}
										>
											{/* <CIcon icon={cilLockLocked} className="me-2" /> */}
											Log Out
										</CDropdownItem>
									</CDropdownMenu>
								</CDropdown>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Navi;
