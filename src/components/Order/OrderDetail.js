import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Col, Container, Row, Spinner } from "reactstrap";
import { Button } from "react-bootstrap";
import Footer from "../../HomePage/Footer";
import Navi from "../../HomePage/Navi";
import img from "../../img/product_single_04.jpg";
import { Link, useParams } from "react-router-dom";
import { mapping, Myorder, orderdetail } from "./OrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../Context/AuthContext";
import { Alert } from "react-bootstrap";
import Toasts from "../Toast/Toast";
const OrderDetail = () => {
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	let x = [];
	const [arrays, setArray] = useState([]);
	const {
		authState: { isAuthenticated, user },
	} = useContext(AuthContext);
	const ORDER = useSelector((state) => state.orders.orderDetail);
	const isLoading = useSelector((state) => state.orders.isLoading);
	const mapp = useSelector((state) => state.orders.mapping);
	useEffect(() => {
		const fectchData = async () => {
			try {
				const action = await dispatch(Myorder());
				const res = unwrapResult(action);
				const action1 = orderdetail(id);
				dispatch(action1);
				const action2 = mapping();
				dispatch(action2);
				// console.log(res);
				// console.log(orderdetai);
			} catch (error) {}
		};
		fectchData();
	}, [isAuthenticated]);
	useEffect(() => {
		console.log("set", mapp);
		setArray(mapp);
	}, [mapp]);
	// setTimeout(() => {
	// 	//console.log(orderdetai);

	// 	Object.values(orderdetai.product).map((a, b) => {
	// 		const index = x.findIndex((i) => i.product._id === a._id);
	// 		if (index == -1) {
	// 			x.push({ product: a, quantity: 1 });
	// 		} else {
	// 			x[index].quantity = x[index].quantity + 1;
	// 		}
	// 	}, []);
	// 	setArray(x);
	// 	console.log(x);
	// }, 3000);

	return (
		<>
			<Navi></Navi>
			<Toasts></Toasts>
			{/* <div
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
					Order Details{" "}
				</div>
			</div> */}
			<div className="px-5">
				<Row>
					<Col md={8}>
						<Row>
							<Row
								className="text-success mb-4"
								style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
							>
								Shipping
							</Row>
							<Row className="shadow  border-top p-5">
								<Row>
									<div className="h5">Name : {user.fullName}</div>
								</Row>
								<Row>
									<div className="h5">
										Address : {ORDER.deliveryAddress}
									</div>
								</Row>
								{ORDER.status !== "shipping" ? (
									<Alert variant="success">
										Delivered at {ORDER?.deliveryAddress}
									</Alert>
								) : (
									<Alert variant="danger">Not Delivered</Alert>
								)}
							</Row>
						</Row>
						<Row>
							<Row
								className="text-success mb-4"
								style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
							>
								Payment
							</Row>
							<Row className="shadow  border-top p-5">
								<Row>
									<div className="h5">Method : PayPal</div>
								</Row>

								{ORDER.payment ? (
									<Alert variant="success">
										Delivered at {ORDER.deliveredAt}
									</Alert>
								) : (
									<Alert variant="danger">Not Paid</Alert>
								)}
							</Row>
						</Row>
						<Row>
							<Row
								className="text-success mb-4"
								style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
							>
								Detail
							</Row>
							<Row className="shadow  border-top p-5">
								<Row className="h4 text-success font-weight-bold mb-3">
									Order Items
								</Row>
								{isLoading && (
									<Spinner className="d-flex align-items-center justify-content-center" />
								)}
								{!isLoading &&
									arrays.length > 0 &&
									arrays.map((a, index) => {
										return (
											<>
												<Row
													className="text-center mb-3"
													key={index}
												>
													<Col>
														<img
															src={a.product.avatar}
															className="img-order"
														/>
													</Col>
													<Col className="d-flex align-items-center justify-content-center">
														<div
															className=" h6 text-primary"
															to={`/shop-single/${a.product._id}`}
															style={{ cursor: "pointer" }}
															onClick={() =>
																history.push(
																	`/shop-single/${a.product._id}`
																)
															}
														>
															{a.product.name}
														</div>
													</Col>
													<Col className="d-flex align-items-center justify-content-center">
														{a.product.price}Đ x {a.quantity} ={" "}
														{a.product.price * a.quantity}Đ
													</Col>
												</Row>
												<hr />
											</>
										);
									})}
							</Row>
						</Row>
					</Col>
					<Col md={4}>
						<Row
							className="text-success mb-4"
							style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
						>
							ORDER SUMMARY
						</Row>
						<Row className="shadow  border-top p-5">
							<Row>
								<Col>
									<div className="h5">Items :</div>
								</Col>
								<Col>{ORDER.totalPrice}Đ</Col>
							</Row>
							<Row>
								<Col>
									<div className="h5">Shipping :</div>
								</Col>
								<Col>Free Shipping</Col>
							</Row>
							<Row>
								<Col>
									<div className="h5">Order Total :</div>
								</Col>
								<Col>
									<div className="h3 text-primary">
										{ORDER.totalPrice}Đ
									</div>
								</Col>
							</Row>
							<Row className="mt-5">
								<Button variant="primary">Pay</Button>
							</Row>
						</Row>
					</Col>
				</Row>
			</div>
			<Footer></Footer>
		</>
	);
};

export default OrderDetail;
