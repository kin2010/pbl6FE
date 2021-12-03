import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import img from "../img/banner_img_01.jpg";
import "./Login.css";
const Team = () => {
	const product = useSelector((state) => state.shops.productDummy);
	const [data, setdata] = useState();
	React.useEffect(() => {
		return setTimeout(() => {
			if (product) {
				setdata(Object.values(product).splice(3, product.length));
			}
			console.log(data);
		}, 200);
	}, [product]);
	return (
		<>
			<section className="bg-light">
				<div className="container py-5">
					<div className="row text-center py-3">
						<div className="col-lg-6 m-auto">
							<h1 className="h1">Sản phẩm mới nhất</h1>
							<p>
								{/* Reprehenderit in voluptate velit esse cillum dolore eu
								fugiat nulla pariatur. Excepteur sint occaecat cupidatat
								non proident. */}
							</p>
						</div>
					</div>
					<div className="row">
						{data ? (
							data.map((item) => {
								return (
									<>
										{" "}
										<div
											className="col-12 col-md-4 mb-4"
											key={item._id}
										>
											<div className="card h-100">
												<a href="shop-single.html">
													<img
														src={item.avatar}
														className="card-img-top"
														alt="..."
													/>
												</a>
												<div className="card-body">
													<ul className="list-unstyled d-flex justify-content-between">
														<li>
															<i className="text-warning fa fa-star" />
															<i className="text-warning fa fa-star" />
															<i className="text-warning fa fa-star" />
															<i className="text-muted fa fa-star" />
															<i className="text-muted fa fa-star" />
														</li>
														<li className="text-muted text-right">
															${item?.price}
														</li>
													</ul>
													<a
														href="shop-single.html"
														className="h2 text-decoration-none text-dark"
													>
														{item.name}
													</a>
													<p className="card-text">
														{item.description}
													</p>
													<p className="text-muted">
														Reviews (24)
													</p>
												</div>
											</div>
										</div>
									</>
								);
							})
						) : (
							<div></div>
						)}
					</div>
				</div>
			</section>

			{/* <div className="container py-5">
				<div className="row text-center text-white">
					<div className="col-lg-8 mx-auto">
						<h2
							className="row-title"
							style={{ color: "#2596be", fontWeight: 600 }}
						>
							Đội ngũ phát triển
						</h2>
						<p className="lead mb-0 subtitle">Đồ án c HTTT </p>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row text-center justify-content-center">
					<div className="col-xl-3 col-sm-6 mb-5">
						<div className=" py-5 px-4">
							<img
								src={img}
								alt=""
								width="200"
								className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
							/>
							<h5 className="mb-0">Ton That Quynh Anh</h5>
							<span className="small text-uppercase text-muted">
								Android Developer
							</span>
							<ul className="social mb-0 list-inline mt-3">
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-facebook-f"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-twitter"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 mb-5">
						<div className="py-5 px-4">
							<img
								src={img}
								alt=""
								width="200"
								className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
							/>
							<h5 className="mb-0">Lee Quang Thong</h5>
							<span className="small text-uppercase text-muted">
								Back-End Developer
							</span>
							<ul className="social mb-0 list-inline mt-3">
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-facebook-f"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-twitter"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 mb-5">
						<div className="py-5 px-4">
							<img
								src={img}
								alt=""
								width="200"
								className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
							/>
							<h5 className="mb-0">THe Vien</h5>
							<span className="small text-uppercase text-muted">
								Front-End Developer
							</span>
							<ul className="social mb-0 list-inline mt-3">
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-facebook-f"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-twitter"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 mb-5">
						<div className=" py-5 px-4">
							<img
								src={img}
								alt=""
								width="200"
								className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
							/>
							<h5 className="mb-0">Khuong Duy</h5>
							<span className="small text-uppercase text-muted">
								Android Developer
							</span>
							<ul className="social mb-0 list-inline mt-3">
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-facebook-f"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a className="social-link">
										<i className="fa fa-twitter"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default Team;
