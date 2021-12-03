import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
	ButtonGroup,
	Container,
	Form,
	Button,
	Row,
	Col,
} from "react-bootstrap";
import Toasts from "../../../Toast/Toast";
import viewIcon from "../../../../img/eye.png";
import trashIcon from "../../../../img/trash.png";
import empty from "../../../../img/empty.jpg";

import { apiURL } from "../../../../Context/Constants";
import ImagePreviewModal from "../../../PreviewImage";
import { CategoryContext } from "../../../../Context/CategoryContext";
import { Redirect, useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getOneProduct, updateProduct } from "../../../Shop/ShopSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ShopApi from "../../../../api/ShopApi";
import { AuthContext } from "../../../../Context/AuthContext";
const ProductUpdate = () => {
	const [validated, setValidated] = useState(false);
	const [imageinput, setImageinput] = useState([]);
	const [imageupdated, setImageupdated] = useState([]);
	const numberimageslide = [1, 2, 3, 4];
	const ChangeImage = [];
	const fileimageslide = ["file1", "file2", "file3", "file4"];
	const { setImagePreview, setShowImagePreviewModal } =
		useContext(CategoryContext);
	const [dataUpdate, setDataupdate] = useState("");
	const [categoryProduct, setCategoryProducts] = useState([]);
	const [shopProduct, setshopProducts] = useState([]);
	const [_id, setID] = useState();
	const { id } = useParams();
	const [URLimage, setURlimage] = useState([]);
	const [productUpdate, setproductUpdate] = useState([]);
	const dispatch = useDispatch();
	const numberimage = [0, 1, 2, 3, 4];
	const history = useHistory();
	let minhhoa;
	const {
		authState: { isAuthenticated },
		setShowToast,
	} = useContext(AuthContext);
	useEffect(() => {
		const fetchData = async () => {
			try {
				// const action=dispatch(getOneProduct(id))
				// const data=unwrapResult(action)
				const res = await ShopApi.getOne(id);
				// console.log(res);
				setDataupdate({
					...res.data,
					category: res.data.category._id,
					shop: res.data.shop._id,
				});
				console.log(dataUpdate);
				setImageinput((imageinput) => ({
					...imageinput,
					[0]: res.data.avatar,
				}));
				//console.log(res.data);
				if (res.data.photos.length > 0) {
					res.data.photos.map((item, index) => {
						setImageinput((image) => ({
							...image,
							[index + 1]: res.data.photos[index],
						}));
					});
				}
			} catch (error) {
				console.log(error);
				setDataupdate([]);
			}
		};
		if (id !== "add") {
			//update
			fetchData();
			// dataUpdate.name = productUpdate?.name;
			//
			console.log(productUpdate, "ok ne`");
		} else {
		}
	}, [isAuthenticated]);

	const fetchData = async () => {
		try {
			const response = await axios.get(`${apiURL}/categories`);

			setCategoryProducts(response.data);
		} catch (error) {
			setCategoryProducts([]);
		}
	};
	const fetchData2 = async () => {
		try {
			const response = await axios.get(`${apiURL}/shops`, {
				limit: 20,
				page: 1,
			});

			setshopProducts(response.data);
		} catch (error) {
			setshopProducts([]);
		}
	};
	const imagepreview = (index) => {
		setImagePreview(imageinput[index]);
		setShowImagePreviewModal(true);
	};
	useEffect(() => {
		fetchData();
		fetchData2();
	}, [isAuthenticated]);
	const onChangeUpdate = (event) => {
		setDataupdate({ ...dataUpdate, [event.target.name]: event.target.value });
	};
	const deleteimage = (index) => {
		imageupdated[index] = "deleted";

		setImageupdated({ ...imageupdated });
		setImageinput((imageinput) => ({ ...imageinput, [index]: "undefined" }));
	};

	const imageHandler = (index, e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImageinput((imageinput) => ({
					...imageinput,
					[index]: reader.result,
				}));
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		imageupdated[index] = e.target.files[0];
		setImageupdated({ ...imageupdated });
	};
	useEffect(() => console.log(imageupdated), [imageupdated]);
	const handleKeypress = (e) => {
		const characterCode = e.key;
		if (characterCode === "Backspace") return;

		const characterNumber = Number(characterCode);
		if (characterNumber >= 0 && characterNumber <= 9) {
			if (e.currentTarget.value && e.currentTarget.value.length) {
				return;
			} else if (characterNumber === 0) {
				e.preventDefault();
			}
		} else {
			e.preventDefault();
		}
	};
	const onSubmit = async (event) => {
		//event.preventDefault();

		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			event.preventDefault();
			if (id === "add") {
				if (!dataUpdate.shop || !dataUpdate.category) {
					console.log("nooo");
					setShowToast({
						show: true,
						message: "Vui lòng chọn Category và Shop",
						type: "warning",
					});
					return;
				}
				console.log("add ne");
				const formData = new FormData();
				formData.append("photo", imageupdated[0]);
				const config = {
					headers: {
						"content-type": "multipart/form-data",
					},
				};
				try {
					const res = await axios.post(
						`${apiURL}/uploads/single`,
						formData,
						config
					);
					URLimage[0] = res.data;
					setURlimage({ ...URLimage });

					console.log(res.data);
				} catch (error) {
					console.log(error);
					return;
				}

				try {
					console.log(
						dataUpdate.category,
						dataUpdate.shop,
						URLimage[0].url
					);
					const raw = {
						name: dataUpdate?.name,
						price: dataUpdate.price | 0,
						category: dataUpdate.category,
						avatar: URLimage[0].url,
						shop: dataUpdate.shop,
						description: dataUpdate.description,
					};
					console.log(raw.avatar);
					const response = await axios.post(`${apiURL}/products`, raw);
					if (response.status === 200) {
						console.log("ok");
						history.push("/admin/product");
						setShowToast({
							show: true,
							type: "success",
							message: "Thêm thành công",
						});
					}
				} catch (error) {
					setShowToast({
						show: true,
						type: "danger",
						message: "Validation error",
					});
					console.log(error);
				}
			} else {
				//update

				const formData1 = new FormData();
				numberimage.map((i) => {
					if (imageupdated[i]) {
						if (imageupdated[i] !== "deleted") {
							formData1.append("photo", imageupdated[i]);
						}

						ChangeImage.push(i);
					}
				});
				console.log(ChangeImage);

				const config = {
					headers: {
						"content-type": "multipart/form-data",
					},
				};
				try {
					const res = await axios.post(
						`${apiURL}/uploads/multiple`,
						formData1,
						config
					);

					console.log(res.data);
					if (!imageupdated[0]) {
						//not changed avatar
						//photo
						let dem = 0;
						ChangeImage.map((i, index) => {
							if (imageupdated[i] !== "deleted") {
								setImageinput((imageinput) => ({
									...imageinput,
									[i]: res.data[dem],
								}));

								dem++;
							}
						});
						const photos = imageinput;
						delete photos[0];
						Object.values(photos).filter((t) => {
							if (t === undefined) return -1;
							else return 1;
						});
						console.log(photos);
						const a = Object.values(photos);
						const value = {
							name: dataUpdate?.name,
							price: dataUpdate.price | 0,
							category: dataUpdate.category,

							shop: dataUpdate.shop,
							description: dataUpdate.description,
							photos: a,
							avatar: imageinput[0],
						};
						const params = { id: id, value: value };

						try {
							const action = await dispatch(updateProduct(params));
							const resp = unwrapResult(action);
							console.log(resp);
							setShowToast({
								show: true,
								message: " Cập nhật thành công",
								type: "success",
							});
							history.push("/admin/product");
						} catch (error) {
							setShowToast({
								show: true,
								message: " Xảy ra lỗi !",
								type: "danger",
							});
							console.log(error);
						}
					} else {
						//changed avatar
						let dem = 1;
						ChangeImage.map((i, index) => {
							if (i !== 0 && imageupdated[i] !== "deleted") {
								setImageinput((imageinput) => ({
									...imageinput,
									[i]: res.data[dem],
								}));
								dem++;
							}
						});

						const photos = imageinput;
						delete photos[0];
						const b = Object.values(photos).filter((t) => {
							if (t === undefined) return -1;
							else return 1;
						});
						console.log(photos, dataUpdate.category, b);
						const a = Object.values(photos);
						const value = {
							name: dataUpdate?.name,
							price: dataUpdate.price | 0,
							category: dataUpdate.category,

							shop: dataUpdate.shop,
							description: dataUpdate.description,
							photos: a,
							avatar: res.data[0],
						};
						const params = { id: id, value: value };

						try {
							const action = await dispatch(updateProduct(params));
							const resp = unwrapResult(action);
							console.log(resp);
							setShowToast({
								show: true,
								message: " Cập nhật thành công",
								type: "success",
							});
							history.push("/admin/product");
						} catch (error) {
							setShowToast({
								show: true,
								message: " Xảy ra lỗi !",
								type: "danger",
							});
							console.log(error);
						}
					}
				} catch (error) {
					console.log(error);
					return;
				}
			}
		}

		setValidated(true);
	};
	minhhoa = (
		<>
			{id === "add" && <></>}
			{id !== "add" && (
				<>
					<>
						<Row className="my-5">
							<Form.Group>
								<Form.Label>Ảnh minh họa:</Form.Label>
								<Row>
									{numberimageslide.map((numberimageslide, index) => {
										return (
											<Col md={3}>
												<div>
													<div className="img-holder">
														<img
															src={
																imageinput[numberimageslide] !==
																	"undefined" &&
																imageinput[numberimageslide] !==
																	undefined
																	? imageinput[
																			numberimageslide
																	  ]
																	: empty
															}
															alt=""
															id="img"
															className="img-content"
														/>
														<div
															className="overlay-image"
															hidden={
																imageinput[numberimageslide] !==
																	"undefined" &&
																imageinput[numberimageslide] !==
																	undefined
																	? ""
																	: "hiden"
															}
														></div>
														<div className="button-image-view">
															<Button
																className="post-button"
																hidden={
																	imageinput[
																		numberimageslide
																	] !== "undefined" &&
																	imageinput[
																		numberimageslide
																	] !== undefined
																		? ""
																		: "hiden"
																}
																onClick={imagepreview.bind(
																	this,
																	numberimageslide
																)}
															>
																<img
																	src={viewIcon}
																	alt="view"
																	width="45"
																	height="45"
																/>
															</Button>
														</div>
														<div className="button-image-delete">
															<Button
																className="post-button"
																hidden={
																	imageinput[
																		numberimageslide
																	] !== "undefined" &&
																	imageinput[
																		numberimageslide
																	] !== undefined
																		? ""
																		: "hiden"
																}
																onClick={deleteimage.bind(
																	this,
																	numberimageslide
																)}
															>
																<img
																	src={trashIcon}
																	alt="trash"
																	width="45"
																	height="45"
																/>
															</Button>
														</div>
													</div>
													<Form.Control
														type="file"
														accept=".png, .jpg, .jpeg"
														name={fileimageslide[index]}
														id={fileimageslide[index]}
														onChange={(e) =>
															imageHandler(numberimageslide, e)
														}
													/>
													<div className="label-image text-center">
														<label
															className="image-upload"
															htmlFor={fileimageslide[index]}
														>
															Chọn ảnh {numberimageslide}
														</label>
													</div>
												</div>
											</Col>
										);
									})}
								</Row>
							</Form.Group>
						</Row>
					</>
				</>
			)}
		</>
	);
	return (
		<>
			<Container>
				<Toasts></Toasts>
				<Form noValidate validated={validated} onSubmit={onSubmit} id="add">
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="custom1">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={dataUpdate.name}
									name="name"
									required
									minLength={5}
									maxLength={50}
									defaultValue=""
									onChange={onChangeUpdate}
								/>
								<Form.Text className="text-muted">
									Product Name
								</Form.Text>
								<Form.Control.Feedback type="invalid">
									Tên sản phẩm từ 5 đến 50 kí tự
								</Form.Control.Feedback>
							</Form.Group>

							<Row>
								<Col>
									<Form.Group className="mb-3" controlId="custom2">
										<Form.Label>Created At</Form.Label>
										<Form.Control
											type="text"
											placeholder="Created At"
											disabled
											value={dataUpdate.createdAt}
											name="createdAt"
										/>
										<Form.Text className="text-muted">
											Create At
										</Form.Text>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group className="mb-3" controlId="custom3">
										<Form.Label>updated At</Form.Label>
										<Form.Control
											type="text"
											placeholder="update At"
											disabled
											value={dataUpdate.updatedAt}
											name="updatedAt"
										/>
										<Form.Text className="text-muted">
											Update At
										</Form.Text>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3" controlId="custom4">
								<Form.Label>Category</Form.Label>
								<Form.Control
									onChange={onChangeUpdate}
									name="category"
									form="add"
									as="select"
									placeholder="Category"
									required
									defaultValue={categoryProduct?.category?._id}
									value={
										dataUpdate.category === undefined
											? ""
											: dataUpdate.category._id
									}
								>
									{categoryProduct.map((cate, index) => {
										// if (index === 0) {
										// 	setDataupdate({
										// 		...dataUpdate,
										// 		category: categoryProduct._id,
										// 	});
										// }
										return (
											<>
												<option
													key={cate._id}
													value={cate._id}
													defaultValue={index === 0}
												>
													{cate.name}
												</option>
											</>
										);
									})}
								</Form.Control>
							</Form.Group>
							<div onClick={() => console.log(dataUpdate)}>test</div>
							<Form.Group className="mb-3" controlId="custom5">
								<Form.Label>Shop</Form.Label>
								<Form.Control
									onChange={onChangeUpdate}
									name="shop"
									form="add"
									as="select"
									required
									placeholder="Password"
									defaultValue={shopProduct?.shop?._id || ""}
									value={
										dataUpdate.shop === undefined
											? ""
											: dataUpdate.shop._id
									}
								>
									{shopProduct.map((cate, index) => {
										// if (index === 0) {
										// 	setDataupdate({
										// 		...dataUpdate,
										// 		shop: cate._id,
										// 	});
										// }
										return (
											<>
												<option
													key={cate._id}
													value={cate._id}
													defaultValue={index === 0}
												>
													{cate.name}
												</option>
											</>
										);
									})}
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="custom6">
								<Form.Label for="code">Price</Form.Label>
								<Form.Control
									type="number"
									placeholder="Giá"
									name="price"
									required
									min="1000"
									value={dataUpdate.price}
									onKeyDown={handleKeypress}
									onChange={onChangeUpdate}
								/>
								<Form.Control.Feedback type="invalid">
									Giá sản phẩm từ 1000
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group
								controlId="validationCustom06"
								className="mt-3"
							>
								<Form.Label for="description">Mô tả</Form.Label>
								<Form.Control
									as="textarea"
									placeholder="Mô tả sản phẩm"
									rows="3"
									name="description"
									value={dataUpdate.description}
									onChange={onChangeUpdate}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Label>Avatar</Form.Label>
								<div className="img-holder ">
									<img
										src={imageinput[0] ? imageinput[0] : empty}
										alt=""
										id="img"
										className="img-content"
									/>
								</div>
								{id !== "add" && (
									<>
										<Form.Control
											type="file"
											accept=".png, .jpg, .jpeg"
											name="image"
											id="file"
											onChange={(e) => imageHandler(0, e)}
										/>
									</>
								)}
								{id === "add" && (
									<>
										<Form.Control
											type="file"
											accept=".png, .jpg, .jpeg"
											name="image"
											id="file"
											onChange={(e) => imageHandler(0, e)}
										/>
									</>
								)}

								<div className="label-image text-center">
									<label className="image-upload" htmlFor="file">
										Chọn file ảnh
									</label>
								</div>
								<Form.Control.Feedback
									className="text-center"
									type="invalid"
								>
									Chọn ảnh cho sản phẩm
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>
					{minhhoa}

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<ImagePreviewModal></ImagePreviewModal>
			</Container>
		</>
	);
};

export default ProductUpdate;
