import React, { useContext } from "react";
import {
	Card,
	Button,
	OverlayTrigger,
	Tooltip,
	Image,
	Nav,
} from "react-bootstrap";
import img1 from "../../img/shop_01.jpg";
import { Link } from "react-router-dom";
import "./Product.css";
import { CartContext } from "../../Context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { addCarts } from "../Cart/CartSlice";
import { findOne } from "../Shop/ShopSlice";
import Toasts from "../Toast/Toast";
import { AuthContext } from "../../Context/AuthContext";
const Product = ({ product }) => {
	const { _id: id, avatar: image, name, desc, price } = product;
	//React.useEffect(() => console.log(id));
	let hover;
	const { showToast, setShowToast } = useContext(AuthContext);
	const { addCart } = React.useContext(CartContext);
	hover = <>aaaaaaaaaaaaaa</>;
	const dispatch = useDispatch();
	const productDummy = useSelector((state) => state.shops.productDummy);
	const add = (id) => {
		//add cart
		try {
			console.log(id);
			const addProduct = productDummy.find((pro) => pro._id === id);
			if (addProduct) {
				const action = addCarts(addProduct);
				dispatch(action);
				//showtoast
				setShowToast({
					show: true,
					message: "Thêm vào giỏ hàng thành công",
					type: "success",
				});
			}

			//addCart(id);
		} catch (error) {
			//showtoast
			setShowToast({
				show: true,
				message: "Có lỗi xảy ra",
				type: "danger",
			});
		}
	};
	return (
		<>
			<Card
				style={{ cursor: "pointer" }}
				className=" shadow mb-5 "
				style={{ width: "15rem" }}
			>
				<div className="card-img-overlay rounded-0 product-overlay d-flex flex-row align-items-center justify-content-center">
					<ul className="list-unstyled d-flex flex-row w-75 align-items-center justify-content-between ">
						<li className="mt-2">
							<Nav.Link
								className="btn btn-success text-white"
								to={`/shop-single/${id}`}
								as={Link}
							>
								<i className="far fa-heart" />
							</Nav.Link>
						</li>
						<li>
							<Nav.Link
								className="btn btn-success text-white mt-2"
								to={`/shop-single/${id}`}
								as={Link}
							>
								<i className="far fa-eye" />
							</Nav.Link>
						</li>
						<li>
							<a
								className="btn btn-success text-white mt-2"
								onClick={() => add(id)}
							>
								<i className="fas fa-cart-plus" />
							</a>
						</li>
					</ul>
				</div>
				{/* <OverlayTrigger
					placement="bottom"
					overlay={
						<div className="d-flex align-items-center justify-content-center">
							<i class="pull-right fas fa-cart-plus"></i>
							<i class="pull-right fas fa-cart-plus"></i>
							<i class="pull-right fas fa-cart-plus"></i>
						</div>
					}
				>
					{({ ref, ...triggerHandler }) => (
						<Button
							variant="light"
							{...triggerHandler}
							className="d-inline-flex align-items-center"
						>
							<Card.Img ref={ref} variant="top" src={img1} />{" "}
						</Button>
					)}
				</OverlayTrigger> */}
				<Card.Img variant="top" src={image} />

				<Card.Body className="text-success">
					<Card.Title>{name}</Card.Title>
					<Card.Text>{desc}</Card.Text>
					<ul className="list-unstyled d-flex justify-content-center mb-1">
						<li>
							<i className="text-warning fa fa-star" />
							<i className="text-warning fa fa-star" />
							<i className="text-warning fa fa-star" />
							<i className="text-muted fa fa-star" />
							<i className="text-muted fa fa-star" />
						</li>
					</ul>
					<p className="text-center text-dark mb-0 h5">{price} Đ</p>
					{/* <Button variant="primary">Go somewhere</Button> */}
				</Card.Body>
			</Card>
			<Toasts></Toasts>
		</>
	);
};

export default Product;
