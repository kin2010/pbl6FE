import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navi from "../../HomePage/Navi";
import Footer from "../../HomePage/Footer";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Nav,
	InputGroup,
	FormControl,
	Spinner,
} from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder } from "../Order/OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Toasts from "../Toast/Toast";
const Checkout = () => {
	const {
		authState: { user, isAuthenticated },
	} = React.useContext(AuthContext);
	var fullName = "";
	var email = "";
	const [dataForm, setDataForm] = useState("");
	const [total, setTotal] = React.useState(0);
	const {
		cartState: { carts },
		cartState,
		increase_quatity,
		decrease_quatity,
		removeCart,
		removeAllCart,
	} = React.useContext(CartContext);
	//console.log(user);
	useEffect(() => {});
	const history = useHistory();
	const dispatch = useDispatch();
	const cartsDummy = useSelector((state) => state.carts.cartDummy);
	React.useEffect(() => {
		//total
		let total = 0;
		cartsDummy.map((item) => {
			total += item.product.price * item.quatity;
		});
		setTotal(total);
	}, [cartsDummy]);
	useEffect(() => {
		try {
			if (user) {
				setDataForm({
					...dataForm,

					fullName: user.fullName || "",
					email: user.email || "",
					phoneNumber: user.phoneNumber || "",
					address: user.address || "",
				});
			}
		} catch (error) {}
	}, [isAuthenticated]);
	const changeForm = (event) => {
		setDataForm({ ...dataForm, [event.target.name]: event.target.value });
		//console.log(dataForm);
	};
	const { setShowToast } = useContext(AuthContext);
	const orders = useSelector((state) => state.orders.orders);
	const isLoading = useSelector((state) => state.orders.isLoading);
	const submit = async (e) => {
		e.preventDefault();
		try {
			if (cartsDummy.length > 0) {
				let product = [];
				cartsDummy.map((cart) => {
					for (let i = 1; i <= cart.quatity; i++) {
						product.push(cart.product._id);
					}
				});
				console.log("product", product);
				const order = {
					totalPrice: total,
					deliveryAddress: dataForm.address,
					product: product,
					status: "shipping",
				};
				const action = await dispatch(CreateOrder(order));
				const re = unwrapResult(action);
				console.log(re);
				setShowToast({
					show: true,
					message: "Order thành công",
					type: "success",
				});

				setTimeout(() => {
					history.push(`/order/${re._id}`);
				}, 2000);
			} else {
				setShowToast({
					show: true,
					message: "Bạn phải mua hàng trước !",
					type: "danger",
				});
			}
		} catch (error) {
			setShowToast({
				show: true,
				message: error.message,
				type: "danger",
			});
		}
		console.log(dataForm);
	};
	return (
		<>
			<Navi></Navi>
			<div
				style={{ background: "#e9ecef" }}
				className=" w-100 py-5 text-center 	 "
			>
				<div
					className="d-inline "
					style={{ cursor: "pointer" }}
					onClick={() => {
						history.push("/");
					}}
				>
					Home
				</div>{" "}
				<div className="d-inline" style={{ cursor: "pointer" }}>
					{" "}
					/
				</div>{" "}
				<div className="d-inline fw-bold" style={{ cursor: "pointer" }}>
					Checkout
				</div>
			</div>
			<Container>
				<Toasts></Toasts>
				<Form onSubmit={submit}>
					<Row style={{ marginTop: 150 }}>
						<Col>
							<h3 className="mb-4 text-center text-success">
								Billing Details
							</h3>
							<div className=" p-5 shadow">
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Full Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Full Name"
										value={dataForm.fullName}
										disabled
									/>
									<Form.Text className="text-muted">
										Full Name{" "}
									</Form.Text>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={dataForm.email}
										disabled
									/>
									<Form.Text className="text-muted">Email</Form.Text>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="number"
										placeholder="Phone Number"
										value={dataForm.phoneNumber}
										required
										disabled
									/>
									<Form.Text className="text-muted">Phone</Form.Text>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Street Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Street Address"
										required
										value={dataForm.address}
									/>
									<Form.Text className="text-muted">
										Street Address
									</Form.Text>
								</Form.Group>

								{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Check me out" />
							</Form.Group> */}
								<h5>Additional information</h5>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label>Order Notes</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										name="moreinfo"
										value={dataForm.moreinfo}
										onChange={changeForm}
										placeholder="Notes about your order, e.g. special notes for delivery"
									/>
								</Form.Group>
								{/* <Button variant="success" type="submit">
									Submit
								</Button> */}
							</div>
						</Col>
						<Col className="d-flex flex-column align-items-center">
							<h3 className=" mb-4 text-success">Your Order</h3>
							<div
								style={{ width: 450, lineHeight: 5 }}
								className="shadow p-5 "
							>
								<div className="d-flex flex-row justify-content-between border-bottom">
									<div>Product</div>
									<div>Total</div>
								</div>
								<div>
									{/* <div className="d-flex flex-row justify-content-between border-bottom pt-4	">
									<div className="h6">Ao</div>
									<div className="h6">1000 Đ</div>
								</div> */}
									{cartsDummy.map((cart) => {
										return (
											<>
												<div
													className="d-flex flex-row justify-content-between border-bottom pt-4 pb-1"
													key={cart.id}
												>
													<div className="h6">
														{cart.product.name} X{" "}
														<strong className="d-inline">
															{cart.quatity}
														</strong>
													</div>
													<div className="h6">
														{cart.product.price * cart.quatity} Đ
													</div>
												</div>
											</>
										);
									})}
								</div>

								<div className="d-flex flex-row justify-content-between border-bottom pt-4	">
									<div>Shipping</div>
									<div>Free Shipping</div>
								</div>
								<div className="d-flex flex-row justify-content-between border-bottom pt-4 text-success	">
									<div
										style={{ fontWeight: "bold" }}
										className="text-success font-weight-bold"
									>
										Total
									</div>
									<div>{total} Đ</div>
								</div>
								<div></div>
							</div>

							<Row className="shadow p-5 mt-5">
								<div className="">
									<h3 className="text-success">Payment Method</h3>
									<div>
										{/* <Form.Group
											className="mb-3"
											controlId="formBasicCheckbox1"
										>
											<Form.Check
												type="checkbox"
												label="Check me out"
											/>
										</Form.Group> */}
										{/* <Form.Check
											className="text-center font-weight-bold"
											label="PayPal"
											name="radio1"
											type="radio"
											id="radio-1"
											value="1"
										/>
										<Form.Check
											className="text-center font-weight-bold"
											label="Stripe"
											name="radio2"
											type="radio"
											id="radio-2"
											value="2"
										/> */}
										{["radio"].map((type) => (
											<div key={`inline-${type}`} className="mb-3">
												<Form.Check
													label="PayPal"
													name="pay"
													type={type}
													id={`inline-${type}-1`}
													value="1"
													onChange={changeForm}
													required
												/>
												<Form.Check
													value="2"
													label="Stripe"
													name="pay"
													type={type}
													id={`inline-${type}-2`}
													onChange={changeForm}
												/>
												{/* <Form.Check
													
													disabled
													label="3 (disabled)"
													type={type}
													id={`inline-${type}-3`}
												/> */}
											</div>
										))}
									</div>
								</div>
							</Row>
							<Button
								type="submit"
								variant="success mt-4"
								style={{ width: 450 }}
							>
								PLACE ORDER
							</Button>
							{isLoading && <Spinner />}
						</Col>
					</Row>
				</Form>
			</Container>
			<Footer></Footer>
		</>
	);
};

export default Checkout;
