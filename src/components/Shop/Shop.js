import React, { useContext, useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Spinner,
	Pagination,
	Button,
} from "react-bootstrap";
import { CategoryContext } from "../../Context/CategoryContext";
import Footer from "../../HomePage/Footer";
import Header from "../../HomePage/Header";
import { unwrapResult } from "@reduxjs/toolkit";

import Navi from "../../HomePage/Navi";
import Product from "../Product/Product";
import "./Shop.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../Admin/components/Categories/CategoriesSlice";
import { createProduct, getProduct, getShop, sort } from "./ShopSlice";
import Toasts from "../Toast/Toast.js";
const options = [
	{
		label: "Name",
		value: "name",
	},
	{
		label: "Price",
		value: "price",
	},
	{
		label: "Description",
		value: "description",
	},
];
const Shop = () => {
	const {
		CategoryState: { products },
	} = React.useContext(CategoryContext);
	const productDummy = useSelector((state) => state.shops.productDummy);
	const {
		Get_Category,
		Get_Product,
		page,
		setPage,
		searchCate,
		setSearchCate,
	} = useContext(CategoryContext);
	const dispactch = useDispatch();
	// useEffect(() => {
	// 	//category
	// 	try {
	// 		// Get_Category();
	// 		return Get_Product();
	// 	} catch (error) {}
	// }, []);
	const categorie = useSelector((state) => state.categories.Dummydata);
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

	const data = [
		{
			_id: "6159c7d4e08b851f5b90adb0",
			name: "Thiết Bị Điện Tử",
		},
		{
			_id: "6159c7d4e08b851f5b90adb1",
			name: "TV & Thiết Bị Điện Gia Dụng",
		},
		{
			_id: "6159c7d4e08b851f5b90adb2",
			name: "Sức Khoẻ & Làm Đẹp",
		},
		{
			_id: "6159c7d4e08b851f5b90adb3",
			name: "Siêu Thị Tạp Hoá",
		},
		{
			_id: "6159c7d4e08b851f5b90adb4",
			name: "Hàng Gia Dụng Và Đời Sống",
		},
		{
			_id: "6159c7d4e08b851f5b90adb5",
			name: "Hàng Mẹ, Bé & Đồ Chơi",
		},
		{
			_id: "6159c7d4e08b851f5b90adb6",
			name: "Thời Trang Nữ",
		},
		{
			_id: "6159c7d4e08b851f5b90adb7",
			name: "Thời Trang Nam",
		},
	];
	let shop;

	const a = {
		id: 123,
		image: "../../img/shop_01.jpg",
		name: "Vip pro",
		desc: "hangf xin  xo",
		price: "1000.000D",
	};
	shop = (
		<>
			{productDummy.map((item, index) => {
				return (
					<>
						<div key={item.index}>
							<Col>
								<Product product={item} />
							</Col>
						</div>
					</>
				);
			})}
		</>
	);
	const SearchCate = (_id) => {
		console.log(_id);
		setSearchCate(_id);
	};
	const isLoading = useSelector((state) => state.categories.isLoading);
	const isLoadingShop = useSelector((state) => state.shops.isLoading);
	let cate;
	cate = (
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
					{categorie.map((item, index) => {
						return (
							<>
								<div key={item.index}>
									<li className="pb-3">
										<a
											className="collapsed d-flex justify-content-between h3 text-decoration-none"
											href="#"
											onClick={() => SearchCate(item._id)}
										>
											{item.name}
											<i className="pull-right fa fa-fw fa-chevron-circle-right mt-1"></i>
										</a>
									</li>
								</div>
							</>
						);
					})}
				</>
			)}
		</>
	);
	const changeSort = (event) => {
		console.log(event.target.value);
		const action = sort();
		dispactch(action);
		console.log(productDummy);
	};
	return (
		<>
			<Navi></Navi>

			<Container className="mt-5">
				<Row>
					<Col lg={3}>
						<h1 className="h2 pb-4">Categories</h1>
						<ul className="list-unstyled templatemo-accordion">
							{/* <li class="pb-3">
								<a
									class="collapsed d-flex justify-content-between h3 text-decoration-none"
									href="#"
								>
									Gender
									<i class="pull-right fa fa-fw fa-chevron-circle-right mt-1"></i>
								</a>
							</li>
							<li class="pb-3">
								<a
									class="collapsed d-flex justify-content-between h3 text-decoration-none"
									href="#"
								>
									Sale
									<i class="pull-right fa fa-fw fa-chevron-circle-right mt-1"></i>
								</a>
							</li>
							<li class="pb-3">
								<a
									class="collapsed d-flex justify-content-between h3 text-decoration-none"
									href="#"
								>
									Product
									<i class="pull-right fa fa-fw fa-chevron-circle-right mt-1"></i>
								</a>
							</li> */}
							{cate}
						</ul>
					</Col>
					<Col lg={9}>
						<Row>
							<Col md={6}>
								<ul className="list-inline shop-top-menu pb-3 pt-1">
									<li className="list-inline-item">
										<a
											className="h3 text-dark text-decoration-none mr-3"
											href="#"
											onClick={() => setSearchCate("")}
										>
											All
										</a>
									</li>
									{/* <li className="list-inline-item">
										<a
											className="h3 text-dark text-decoration-none mr-3"
											href="#"
										>
											Men's
										</a>
									</li>
									<li className="list-inline-item">
										<a
											className="h3 text-dark text-decoration-none"
											href="#"
										>
											Women's
										</a>
									</li> */}
								</ul>
							</Col>
							<Col md={6} className="mb-4">
								<div className="d-flex">
									<select
										className="form-control"
										onChange={changeSort}
									>
										{/* <option >
											Featured
										</option>
										<option>A to Z</option>
										<option>Item</option> */}
										{options.map((item, index) => {
											return (
												<>
													{" "}
													<option key={index} value={item.value}>
														{item.label}
													</option>
												</>
											);
										})}
									</select>
								</div>
							</Col>
						</Row>

						{productDummy.length === 0 && (
							<>
								<Row style={{ height: 370 }}>
									<div
										className="text-success d-flex justify-content-center "
										style={{ fontSize: 40, fontFamily: "bold" }}
									>
										EMPTY
									</div>
								</Row>
							</>
						)}
						{isLoadingShop && (
							<Spinner
								animation="border"
								variant="success"
								className="justify-content-center position-relative top-50 start-50"
							/>
						)}
						<Row className="row-cols-md-3 g-4 mx-auto mt-3">
							{shop}

							{/* <div div="row">
								<ul className="pagination pagination-lg justify-content-end">
									<li className="page-item disabled">
										<a
											className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0"
											href="#"
											tabIndex={-1}
										>
											1
										</a>
									</li>
									<li className="page-item">
										<a
											className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark"
											href="#"
										>
											2
										</a>
									</li>
									<li className="page-item">
										<a
											className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
											href="#"
										>
											3
										</a>
									</li>
								</ul>
							</div> */}
						</Row>
						<Row>
							<Pagination className="mb-2 mb-lg-0 d-flex justify-content-end">
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
						</Row>
					</Col>
				</Row>
				<Toasts />
			</Container>
			<Footer></Footer>
		</>
	);
};

export default Shop;
