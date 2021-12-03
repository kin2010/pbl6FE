import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import { CategoryContext } from "../Context/CategoryContext";
import { apiURL } from "../Context/Constants";
import Footer from "../HomePage/Footer";
import Navi from "../HomePage/Navi";
import empty from "../img/empty.jpg";
import Toasts from "./Toast/Toast";

const Profile = () => {
	const {
		authState: { user, isAuthenticated },
		updateUser,
	} = useContext(AuthContext);
	const [dataProfile, setData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		address: "",
		gender: "2",
		role: "",
	});
	const { setShowToast } = useContext(AuthContext);
	const [imageinput, setImageinput] = useState(null);
	const [imageUpdate, setImageUpdate] = useState(null);
	const { fullName, email, phoneNumber, address, role, gender } = dataProfile;
	const onChangeData = (e) => {
		setData({
			...dataProfile,
			[e.target.name]: e.target.value,
		});
	};
	useEffect(() => {
		// return setTimeout(() => {
		// 	setData();
		// 	console.log(user);
		// }, 200);
		console.log(user);
		if (user) {
			setData({
				...dataProfile,
				fullName: user.fullName,
				email: user.email,
				phoneNumber: user.phoneNumber,
				address: user.address,
				gender: user.gender,
				role: user.role.name || "",
			});
			setImageinput(user.avatar);
		}
	}, [user]);
	const submit = async (e) => {
		e.preventDefault();
		try {
			console.log(dataProfile, imageUpdate);
			if (imageUpdate) {
				//upload image
				const formData = new FormData();
				formData.append("photo", imageUpdate);
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
					// URLimage[0] = res.data;
					// setURlimage({ ...URLimage });

					console.log(res.data);
					const raw = {
						fullName: fullName,
						address: address,
						phoneNumber: phoneNumber,
						role: user.role._id,
						avatar: res?.data.url,
						gender: gender === "2" ? 2 : 1,
					};

					const response = await axios.put(
						`${apiURL}/user/update-information`,
						raw
					);
					setShowToast({
						show: true,
						message: "Cập nhật thành công",
						type: "success",
					});
					updateUser(response.data);
				} catch (error) {
					console.log(error);
					setShowToast({
						show: true,
						message: "Có lỗi xảy ra !",
						type: "danger",
					});
				}
			} else {
				try {
					const raw = {
						fullName: fullName,
						address: address,
						phoneNumber: phoneNumber,
						role: user.role._id,
						avatar: imageinput,
						gender: gender === "2" ? 2 : 1,
					};

					const response = await axios.put(
						`${apiURL}/user/update-information`,
						raw
					);
					console.log(response);
					setShowToast({
						show: true,
						message: "Cập nhật thành công",
						type: "success",
					});
					updateUser(response.data);
				} catch (error) {
					console.log(error);
					setShowToast({
						show: true,
						message: "Có lỗi xảy ra !",
						type: "danger",
					});
				}
			}
		} catch (error) {}
	};
	const imageHandler = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImageinput(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		// imageupdated[index] = e.target.files[0];
		setImageUpdate(e.target.files[0]);
	};
	return (
		<>
			<Navi></Navi>
			<Container>
				<Toasts></Toasts>
				<Form onSubmit={submit}>
					<Row className="mt-3">
						<Col>
							<Row>
								<div className=" p-5 shadow">
									<Form.Group
										className="mb-3"
										controlId="formBasicEmail"
									>
										<Form.Label>Full Name</Form.Label>
										<Form.Control
											onChange={onChangeData}
											type="text"
											placeholder="Enter Full Name"
											value={fullName}
											name="fullName"
										/>
										<Form.Text className="text-muted">
											Full Name{" "}
										</Form.Text>
									</Form.Group>
									<Form.Group
										className="mb-3"
										controlId="formBasicEmail"
									>
										<Form.Label>Email address</Form.Label>
										<Form.Control
											onChange={onChangeData}
											type="email"
											placeholder="Enter email"
											value={email}
											name="email"
											disabled
										/>
										<Form.Text className="text-muted">
											Email
										</Form.Text>
									</Form.Group>
									<Form.Group
										className="mb-3"
										controlId="formBasicEmail"
									>
										<Form.Label>Phone</Form.Label>
										<Form.Control
											onChange={onChangeData}
											type="number"
											placeholder="Phone Number"
											value={phoneNumber}
											name="phoneNumber"
										/>
										<Form.Text className="text-muted">
											Phone
										</Form.Text>
									</Form.Group>
									<Form.Group
										className="mb-3"
										controlId="formBasicEmail"
									>
										<Form.Label>Street Address</Form.Label>
										<Form.Control
											onChange={onChangeData}
											type="text"
											placeholder="Enter Street Address"
											name="address"
											value={address}
										/>
										<Form.Text className="text-muted">
											Street Address
										</Form.Text>
									</Form.Group>
									<Form.Group
										className="mb-3"
										controlId="formBasicEmail"
									>
										<Form.Label>Role</Form.Label>
										<Form.Control
											onChange={onChangeData}
											type="text"
											placeholder="Enter Street Address"
											name="role"
											disabled
											value={role}
										/>
										<Form.Text className="text-muted">
											Street Address
										</Form.Text>
									</Form.Group>
									{["radio"].map((type) => (
										<div key={`inline-${type}`} className="mb-3">
											<Form.Check
												label="Nam"
												name="gender"
												type={type}
												id={`inline-${type}-1`}
												value="2"
												onChange={onChangeData}
												required
												defaultChecked
											/>
											<Form.Check
												value="1"
												label="Nữ"
												name="gender"
												type={type}
												id={`inline-${type}-2`}
												onChange={onChangeData}
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
							</Row>
						</Col>
						<Col>
							<Row>
								<Form.Group>
									<Form.Label
										className="text-primary ml-5 h5"
										style={{ marginLeft: 45 }}
									>
										Avatar
									</Form.Label>
									<div className="img-holder ">
										<img
											src={imageinput ? imageinput : empty}
											alt=""
											id="img"
											className="img-content"
										/>
									</div>

									<Form.Control
										type="file"
										accept=".png, .jpg, .jpeg"
										name="image"
										id="file"
										onChange={(e) => imageHandler(e)}
									/>

									<div className="label-image text-center mt-3">
										<label
											className="image-upload text-primary"
											htmlFor="file"
										>
											<i class="fas fa-user-edit mr-1"></i>
											Chọn file ảnh
										</label>
									</div>
									<Form.Control.Feedback
										className="text-center"
										type="invalid"
									>
										Chọn ảnh
									</Form.Control.Feedback>
								</Form.Group>
								<Row>
									<Col>
										<div className="d-flex align-items-center justify-content-center">
											<Button
												variant="success"
												className="w-75 mt-4"
												type="submit"
											>
												Cập nhật hồ sơ
											</Button>
										</div>
									</Col>
								</Row>
							</Row>
						</Col>
					</Row>
				</Form>
			</Container>
			<Footer></Footer>
		</>
	);
};

export default Profile;
