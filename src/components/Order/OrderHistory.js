import { unwrapResult } from "@reduxjs/toolkit";
import React, { useContext, useEffect } from "react";
import {
	ButtonGroup,
	Container,
	Row,
	Spinner,
	Table,
	Button,
} from "react-bootstrap";
import "./Order.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Footer from "../../HomePage/Footer";
import Navi from "../../HomePage/Navi";
import { Myorder } from "./OrderSlice";
import { Link } from "react-router-dom";

const OrderHistory = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const orderHistory = useSelector((state) => state.orders.orderHistory);
	const isLoading = useSelector((state) => state.orders.isLoading);
	const {
		setShowToast,
		authState: { isAuthenticated },
	} = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const action = await dispatch(Myorder());
				const res = unwrapResult(action);
				console.log(res);
			} catch (error) {
				// setShowToast({
				// 	show: true,
				// 	message: "Có lỗi xảy ra!",
				// 	type: "danger",
				// });
			}
		};
		fetchData();
	}, [isAuthenticated]);
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
					Order History{" "}
				</div>
			</div>
			{isLoading && (
				<>
					<Container>
						<Spinner
							animation="border"
							variant="success"
							className="position-relative start-50"
						></Spinner>
					</Container>
				</>
			)}
			{!isLoading && (
				<>
					<Container>
						<Row
							className="text-success mb-4"
							style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
						>
							Order History
						</Row>
						{isLoading && <Spinner className="text-center"></Spinner>}
						<Row>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>DATE</th>
										<th>TOTAL</th>
										<th>PAID</th>
										<th>DELIVERED</th>
										<th>ACTION</th>
									</tr>
								</thead>
								<tbody>
									{orderHistory.map((order) => {
										return (
											<>
												<tr
													key={order._id}
													className="font-weight-bold"
												>
													<td>
														<div>{order._id}</div>
													</td>
													<td>{order.createdAt}</td>
													<td>{order.totalPrice}</td>
													<td>
														{order.status === "pending"
															? "NO"
															: "YES"}
													</td>
													<td>
														{order.status === "pending"
															? "NO"
															: "YES"}
													</td>
													<td>
														<Button
															as={Link}
															to={`/order/${order._id}`}
														>
															Details
														</Button>
													</td>
												</tr>
											</>
										);
									})}
								</tbody>
							</Table>
						</Row>
					</Container>
				</>
			)}
			<Footer></Footer>;
		</>
	);
};

export default OrderHistory;
