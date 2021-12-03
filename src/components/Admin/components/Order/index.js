import { unwrapResult } from "@reduxjs/toolkit";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Spinner, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { GetAllOrder } from "../../../Order/OrderSlice";

const Order = () => {
	const { crumb, setCrumb } = useContext(AuthContext);
	useEffect(() => {
		setCrumb("Quản lí đơn hàng");
	}, []);
	const Allorder = useSelector((state) => state.orders.allOrder);
	const isLoading = useSelector((state) => state.orders.isLoading);
	const [page, setPage] = useState(1);
	const {
		authState: { isAuthenticated },
	} = useContext(AuthContext);
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const params = { limit: 10, page: page };
				const action = await dispatch(GetAllOrder(params));
				unwrapResult(action);
			} catch (error) {}
		};

		return () => {
			return fetchData();
		};
	}, [page, isAuthenticated]);
	return (
		<>
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
						{/* <Row
							className="text-success mb-4"
							style={{ fontWeight: 800, marginTop: 30, fontSize: 30 }}
						>
							Order History
						</Row> */}
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
									{Allorder.map((order) => {
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
		</>
	);
};

export default Order;
