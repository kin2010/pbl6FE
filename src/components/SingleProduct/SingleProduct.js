import React, { useContext, useEffect, useState } from "react";
import img1 from "../../img/product_single_10.jpg";
import { Link, useParams } from "react-router-dom";
import { CategoryContext } from "../../Context/CategoryContext";
import { LeftCircleFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
	Button,
	Carousel,
	Col,
	Container,
	Form,
	Row,
	Spinner,
} from "react-bootstrap";
import { findOne, getOneProduct } from "../Shop/ShopSlice";
import Navi from "../../HomePage/Navi";
import { CartContext } from "../../Context/CartContext";
import { addCarts, addCartsQuantity } from "../Cart/CartSlice";
import { AuthContext } from "../../Context/AuthContext";
import Toasts from "../Toast/Toast";
import { unwrapResult } from "@reduxjs/toolkit";

import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import Rating from "../Rating";
import ImagePreviewModal from "../PreviewImage";
const SingleProduct = () => {
	const { setShowToast } = useContext(AuthContext);
	const { id } = useParams();
	const dispatch = useDispatch();
	const shops = useSelector((state) => state.shops.productDummy);
	const product = useSelector((state) => state.shops.product);
	const isLoading = useSelector((state) => state.shops.isLoading);
	const [quantity, setQuantity] = useState(1);
	const {
		CategoryState: { products },
	} = useContext(CategoryContext);
	// const [product, setproduct] = useState([]);
	const [photos, setPhoto] = useState([]);
	const { addCart } = React.useContext(CartContext);
	const [dataForm, setDataForm] = useState({
		rating: "1",
		comment: "",
	});
	const { rating, comment } = dataForm;
	const onChangeForm = (e) => {
		setDataForm({ ...dataForm, [e.target.name]: e.target.value });
	};
	const {
		showImagePreviewModal,
		setShowImagePreviewModal,
		imagePreview,
		setImagePreview,
	} = useContext(CategoryContext);
	const add = (id) => {
		//add cart
		try {
			const addProduct = product;
			if (addProduct) {
				const action = addCartsQuantity({
					product: addProduct,
					quantity: quantity,
				});

				dispatch(action);
			}
			console.log("showtoast");
			setShowToast({
				show: true,
				message: "Đã thêm vào giỏ hàng",
				type: "success",
			});
			// console.log(id);
			// addCart(id);
		} catch (error) {}
	};

	React.useEffect(() => {
		// console.log(id);
		// const a = products.find((pro) => pro.id === id);
		// setproduct(a);
		// console.log(product, products, id, a);
		// const action = findOne(id);
		// dispatch(action);
		const fetch = async () => {
			try {
				const action = await dispatch(getOneProduct(id));
				const dummy = unwrapResult(action);
				console.log(dummy);
			} catch (error) {
				console.log(error);
			}
		};
		setTimeout(() => {
			fetch();
		}, 200);
	}, []);
	useEffect(() => {
		return setPhoto(product.photos);
		console.log(typeof photos);
	}, [product]);
	const submitHandler = (e) => {
		e.preventDefault();
		console.log(dataForm);
	};
	const ShowImage = (src) => {
		setShowImagePreviewModal(true);
		setImagePreview(src);
	};
	return (
		<>
			<Navi></Navi>
			<Toasts></Toasts>
			<ImagePreviewModal></ImagePreviewModal>
			<section className="bg-light">
				{isLoading && (
					<>
						<Container>
							<Spinner className="d-flex align-items-center justify-content-center" />
						</Container>
					</>
				)}
				{!isLoading && (
					<div className="container pb-5">
						<div className="row">
							<div className="col-lg-5 mt-5">
								<div
									style={{ cursor: "pointer" }}
									className="card mb-3"
									onClick={() => ShowImage(product?.avatar)}
								>
									<img
										className="card-img img-fluid"
										src={product?.avatar ? product.avatar : img1}
										alt="Card image cap"
										id="product-detail"
									/>
								</div>
								<div className="row ">
									{/* <div className="col-1 align-self-center">
									<a
										href="#multi-item-example"
										role="button"
										data-bs-slide="prev"
									>
										<i className="text-dark fas fa-chevron-left" />
										<span className="sr-only">Previous</span>
									</a>
								</div>

												
										
									
								</div>

								<div className="col-1 align-self-center">
									<a
										href="#multi-item-example"
										role="button"
										data-bs-slide="next"
									>
										<i className="text-dark fas fa-chevron-right" />
										<span className="sr-only">Next</span>
									</a>
								</div> */}
									<Col
										md={2}
										className="d-flex align-items-center justify-content-center"
									>
										<div>
											<i className="text-dark fas fa-chevron-left" />
											<span className="sr-only">Previous</span>
										</div>
									</Col>
									<Col md={8}>
										<Row>
											{photos ? (
												photos.map((img, index) => {
													const leng = photos.filter(
														(x) => x !== "undefined"
													).length;
													return (
														<>
															{img !== "undefined" && (
																<Col
																	md={12 / leng}
																	key={index}
																	style={{ height: 100 }}
																	onClick={() =>
																		ShowImage(img)
																	}
																>
																	<img
																		style={{
																			cursor: "pointer",
																		}}
																		className="card-img img-fluid w-100 h-100"
																		src={
																			img !== "undefined"
																				? img
																				: ""
																		}
																		alt="slide 3"
																	/>{" "}
																</Col>
															)}
														</>
													);
												})
											) : (
												<div></div>
											)}
										</Row>
									</Col>
									<Col
										md={2}
										className="d-flex align-items-center justify-content-center"
									>
										<div>
											<i className="text-dark fas fa-chevron-right" />
											<span className="sr-only">Next</span>
										</div>
									</Col>
								</div>
							</div>
							{/* col end */}
							<div className="col-lg-7 mt-5">
								<div className="card">
									<div className="card-body">
										<h1 className="h2">{product?.name}</h1>
										<p className="h3 py-2">{product?.price}</p>
										<p className="py-2">
											<i className="fa fa-star text-warning" />
											<i className="fa fa-star text-warning" />
											<i className="fa fa-star text-warning" />
											<i className="fa fa-star text-warning" />
											<i className="fa fa-star text-secondary" />
											<span className="list-inline-item text-dark">
												Rating 4.8 | 36 Comments
											</span>
										</p>
										<ul className="list-inline">
											<li className="list-inline-item">
												<h6>Category : </h6>
											</li>
											<li className="list-inline-item">
												<p className="text-muted">
													<strong>
														{product.category?.name || ""}
													</strong>
												</p>
											</li>
										</ul>
										<ul className="list-inline">
											<li className="list-inline-item">
												<h6>Shop : </h6>
											</li>
											<li className="list-inline-item">
												<p className="text-muted">
													<strong>
														{product?.shop?.name || ""}
													</strong>
												</p>
											</li>
										</ul>
										<h6>Description:</h6>
										<p>
											{product?.description || (
												<div>
													Lorem ipsum dolor sit amet, consectetur
													adipiscing elit, sed do eiusmod temp
													incididunt ut labore et dolore magna
													aliqua. Quis ipsum suspendisse. Donec
													condimentum elementum convallis. Nunc sed
													orci a diam ultrices aliquet interdum
													quis nulla.
												</div>
											)}
										</p>
										{/* <ul className="list-inline">
										<li className="list-inline-item">
											<h6>Avaliable Color :</h6>
										</li>
										<li className="list-inline-item">
											<p className="text-muted">
												<strong>White / Black</strong>
											</p>
										</li>
									</ul> */}
										{/* <h6>Specification:</h6>
									<ul className="list-unstyled pb-3">
									
										Description
									</ul> */}
										<form method="GET">
											<input
												type="hidden"
												name="product-title"
												defaultValue="Activewear"
											/>
											<div className="row">
												<div className="col-auto">
													{product?.size && (
														<ul className="list-inline pb-3">
															<li className="list-inline-item">
																Size :
																<input
																	type="hidden"
																	name="product-size"
																	id="product-size"
																	defaultValue="S"
																/>
															</li>
															<li className="list-inline-item">
																<span className="btn btn-success btn-size">
																	S
																</span>
															</li>
															<li className="list-inline-item">
																<span className="btn btn-success btn-size">
																	M
																</span>
															</li>
															<li className="list-inline-item">
																<span className="btn btn-success btn-size">
																	L
																</span>
															</li>
															<li className="list-inline-item">
																<span className="btn btn-success btn-size">
																	XL
																</span>
															</li>
														</ul>
													)}
												</div>
												<div className="col">
													<ul className="list-inline pb-3">
														<li className="list-inline-item text-left">
															<div className="h5"> Quantity</div>
															{/* <input
															type="hidden"
															name="product-quanity"
															id="product-quanity"
															defaultValue={quantity}
															value={quantity}
														/> */}
														</li>
														<li className="list-inline-item">
															<span
																className="btn btn-success"
																id="btn-minus"
																onClick={() =>
																	quantity > 1 &&
																	setQuantity(quantity - 1)
																}
															>
																-
															</span>
														</li>
														<li className="list-inline-item">
															<span
																className="badge bg-secondary"
																id="var-value"
															>
																{quantity}
															</span>
														</li>
														<li className="list-inline-item">
															<div
																onClick={() =>
																	setQuantity(quantity + 1)
																}
															>
																<span
																	className="btn btn-success"
																	id="btn-plus"
																>
																	+
																</span>
															</div>
														</li>
													</ul>
												</div>
											</div>
											<div className="row pb-3">
												<div className="col d-grid">
													<Button
														type="button"
														className="btn btn-success btn-lg"
														value="buy"
														to="/shop"
														as={Link}
													>
														Back
													</Button>
												</div>
												<div className="col d-grid">
													<Button
														className="btn btn-success btn-lg"
														name="submit"
														value="addtocard"
														onClick={() => add(product?._id)}
													>
														Add To Cart
													</Button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						<Row className="mt-5 mb-5">
							<hr />
							<Col>
								<Row>
									{" "}
									<div className="h2 mb-5 text-success">
										Reviews
									</div>{" "}
								</Row>
								<Row className="bg-white rounded p-3">
									<Row className="mb-5">
										<Row>
											<Col md={4}>
												{" "}
												<div className="h3">Kin Leee</div>
											</Col>
											<Col md={8}>02-12-2021</Col>
										</Row>

										<Row>
											<Rating rating={4}></Rating>
										</Row>
										<Row>
											<div className="text-primary h5">
												San pham nay rat tuyet
											</div>
										</Row>
									</Row>
									<Row className="mb-5">
										<Row>
											<Col md={4}>
												{" "}
												<div className="h3">Kin Leee</div>
											</Col>
											<Col md={8}>02-12-2021</Col>
										</Row>

										<Row>
											<Rating rating={4}></Rating>
										</Row>
										<Row>
											<div className="text-primary h5">
												San pham nay rat tuyet
											</div>
										</Row>
									</Row>
									<Row className="mb-5">
										<Row>
											<Col md={4}>
												{" "}
												<div className="h3">Kin Leee</div>
											</Col>
											<Col md={8}>02-12-2021</Col>
										</Row>

										<Row>
											<Rating rating={4}></Rating>
										</Row>
										<Row>
											<div className="text-primary h5">
												San pham nay rat tuyet
											</div>
										</Row>
									</Row>
								</Row>
							</Col>
							<Col className="">
								<Row>
									{" "}
									<div className="h2 mb-5 text-success">
										Write a customer review
									</div>{" "}
								</Row>
								<Row>
									<Form onSubmit={submitHandler}>
										<Form.Group className="mb-3" controlId="custom4">
											<Form.Label className="text-success h5">
												Rating
											</Form.Label>
											<Form.Control
												onChange={onChangeForm}
												name="rating"
												form="add"
												as="select"
												placeholder="Rating"
												value={rating}
												required
											>
												<option value="">Select...</option>
												<option value="1">1- Poor</option>
												<option value="2">2- Fair</option>
												<option value="3">3- Good</option>
												<option value="4">4- Very good</option>
												<option value="5">5- Excelent</option>
											</Form.Control>
										</Form.Group>
										<Form.Group className="mb-3" controlId="custom5">
											<Form.Label className="text-success h5">
												Comment
											</Form.Label>
											<Form.Control
												required
												as="textarea"
												rows={3}
												name="comment"
												value={comment}
												onChange={onChangeForm}
												placeholder="Nhap Comment"
											/>
										</Form.Group>

										<Button variant="success" type="submit">
											Submit
										</Button>
									</Form>
								</Row>
							</Col>
						</Row>
					</div>
				)}
			</section>
		</>
	);
};

export default SingleProduct;
