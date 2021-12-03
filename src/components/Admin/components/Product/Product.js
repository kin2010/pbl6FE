import { CContainer } from "@coreui/react";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import { formatRelative } from "date-fns/esm";
import "./Product.css";
import {
	Col,
	Row,
	Nav,
	Card,
	Image,
	Button,
	Table,
	Dropdown,
	ProgressBar,
	Pagination,
	ButtonGroup,
	Spinner,
	Form,
	Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProduct } from "../Product/ProductSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Toasts from "../../../Toast/Toast";
import { AuthContext } from "../../../../Context/AuthContext";

export const ProductTable = () => {
	const { crumb, setCrumb } = useContext(AuthContext);
	useEffect(() => {
		setCrumb("Quản lí sản phẩm");
	}, []);
	const [len, setLeng] = useState();
	const [limit, setLimit] = useState(6);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const [active, setActive] = useState(1);
	let items = [];
	for (let number = 1; number <= 5; number++) {
		items.push(
			<Pagination.Item
				key={number}
				active={number === page}
				as={Button}
				onClick={() => setPage(number)}
			>
				{number}
			</Pagination.Item>
		);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const params = {
				// 	name: "Headphone 22",
				// 	price: 300000,
				// 	category: "615dd425233e1a491235d300",
				// 	avatar:
				// 		"https://res.cloudinary.com/dfi8bluhn/image/upload/v1636177764/pbl6/1636177756413-Screen_Shot_2021-11-05_at_01.49.19_n9yevx.png",
				// 	shop: "618617819cefa3e5b594162a",
				// };
				const params = { limit: limit, page: page };
				const action = await dispatch(getProduct(params));
				const dummy = unwrapResult(action);
				console.log(dummy, "data");
			} catch (error) {
				console.log(error);
			}

			//	console.log(dummy);
		};
		return fetchData();
	}, [page]);
	function formatDate(seconds) {
		let formattedDate = "";

		if (seconds) {
			formattedDate = formatRelative(new Date(seconds * 1000), new Date());

			formattedDate =
				formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
		}

		return formattedDate;
	}
	const product = useSelector((state) => state.products.productDummy);
	const isLoading = useSelector((state) => state.products.isLoading);
	useEffect(() => {
		setLeng(product.length);
	}, [product]);
	const TableRow = (props) => {
		const {
			_id,
			id,
			avatar,
			name,
			createdAt,
			category,
			photos,
			price,
			shop,
		} = props;

		const statusVariant = "success";
		// status === "Paid"
		// 	? "success"
		// 	: status === "Due"
		// 	? "warning"
		// 	: status === "Canceled"
		// 	? "danger"
		// 	: "primary";

		return (
			<tr>
				<td>
					<Card.Link as={Link} to={`${_id}`} className="fw-normal">
						{id + 1}
					</Card.Link>
				</td>
				<td>
					<img className="img-fuild" src={avatar} />
				</td>
				<td>
					<span className="fw-normal">{name}</span>
				</td>
				<td>
					<span className="fw-normal">{category?.name}</span>
				</td>

				<td>
					<span className="fw-normal ">{price}</span>
				</td>
				<td>
					<span className="fw-normal">{createdAt}</span>
				</td>
				<td>
					<Dropdown as={ButtonGroup}>
						<Dropdown.Toggle
							as={Button}
							split
							variant="link"
							className="text-dark m-0 p-0"
						>
							<span className="icon icon-sm">
								<i className="icon-dark fas fa-ellipsis-h-alt"></i>
							</span>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{/* <Dropdown.Item>
								<i className="me-2 far fa-eye"></i> View Details
							</Dropdown.Item> */}
							<Dropdown.Item to={`/admin/product/${_id}`} as={Link}>
								<i className="me-2 fas fa-edit"></i> Edit
							</Dropdown.Item>
							<Dropdown.Item className="text-danger">
								<i className="me-2 fas fa-trash"></i> Remove
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			</tr>
		);
	};
	const AddClick = () => {};
	return (
		<>
			{isLoading && (
				<Spinner
					animation="border"
					variant="success"
					className="justify-content-center position-relative top-50 start-50"
				/>
			)}
			{!isLoading && (
				<>
					<Row className="mb-4">
						<Col xs={4}>
							<Form>
								<Form.Group
									// as={Row}
									className="d-flex flex-row align-items-center"
									controlId="formPlaintextPassword"
								>
									<Form.Control
										style={{ marginRight: 38 }}
										type="text"
										placeholder="..."
									/>
									<i className="fas fa-search text-primary "></i>
								</Form.Group>
							</Form>
						</Col>
						<Col xs={4}></Col>
						<Col xs={4} className="d-flex justify-content-end">
							<Button
								variant="primary"
								to={`/admin/product/add`}
								as={Link}
								onClick={AddClick}
							>
								Thêm Sản Phẩm
							</Button>
						</Col>
					</Row>
					<Card
						border="light"
						className="table-wrapper table-responsive shadow-sm "
					>
						<Card.Body className="pt-0">
							<Table
								hover
								className="user-table align-items-center"
								// style={{ maxHeight: 200 }}
							>
								<thead>
									<tr>
										<th className="border-bottom">#</th>
										<th className="border-bottom">Avatar</th>
										<th className="border-bottom">Name</th>
										<th className="border-bottom">Category</th>
										<th className="border-bottom">price</th>
										<th className="border-bottom">Create At</th>
										<th className="border-bottom">Action</th>
									</tr>
								</thead>

								<tbody>
									{product.length === 0 && (
										<tr>
											<td colSpan={7}>
												<div className="text-success d-flex justify-content-center">
													EMPTY
												</div>
											</td>
										</tr>
									)}
									{product.map((t, index) => (
										<TableRow key={t._id} {...t} id={index} />
									))}
								</tbody>
							</Table>

							<Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
								<Nav>
									<Pagination className="mb-2 mb-lg-0 d-flex justify-content-start">
										<Pagination.Prev
											as={Button}
											onClick={() => {
												page > 1 && setPage(page - 1);
											}}
										>
											Previous
										</Pagination.Prev>

										{items}
										<Pagination.Next
											onClick={() => {
												setPage(page + 1);
											}}
										>
											Next
										</Pagination.Next>
									</Pagination>
								</Nav>
								<small className="fw-bold">
									Showing <b>{len || "adad"}</b>
									{/* out of <b>25</b>{" "} */}
									<b> </b>entries
								</small>
							</Card.Footer>
						</Card.Body>
					</Card>
				</>
			)}
		</>
	);
};
const Product = () => {
	const product = useSelector((state) => state.shops.productDummy);

	return (
		<>
			<CContainer>
				<Toasts></Toasts>
				<ProductTable></ProductTable>
			</CContainer>
		</>
	);
};

export default Product;
