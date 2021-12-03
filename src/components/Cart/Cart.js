import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import img from "../../img/product_single_10.jpg";
import img1 from "../../img/product_single_09.jpg";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	addCarts,
	removeAll,
	removeCart,
	decreaseCart,
	increaseCart,
} from "./CartSlice";
const Cart = () => {
	const [total, setTotal] = React.useState(0);
	const {
		cartState: { carts },
		cartState,
		increase_quatity,
		decrease_quatity,
	} = React.useContext(CartContext);

	const cartDummy = useSelector((state) => state.carts.cartDummy);
	React.useEffect(() => {
		//total
		let total = 0;
		cartDummy.map((item) => {
			total += item.product.price * item.quatity;
		});
		setTotal(total);
	}, [cartDummy]);
	const dispatch = useDispatch();
	const increase = (id) => {
		// increase_quatity(id);
		const action = increaseCart(id);
		dispatch(action);
	};
	const decrease = (id) => {
		// decrease_quatity(id);
		const action = decreaseCart(id);
		dispatch(action);
	};
	const remove = (id) => {
		// removeCart(id);
		const action = removeCart(id);
		dispatch(action);
	};
	let body;

	body = (
		<>
			{cartDummy.length == 0 && (
				<>
					<h4
						className="mt-3"
						style={{ textAlign: "center", color: "rgb(56 188 90)" }}
					>
						Empty
					</h4>
				</>
			)}
			{cartDummy.map((ca) => {
				return (
					<>
						<li key={ca.product._id} className="single-shopping-cart">
							<div className="single-shopping-image">
								<a href="#">
									<img
										className="img-fuild"
										src={ca.product.avatar}
										alt="image"
									/>
								</a>
							</div>
							<div className="single-shopping-title">
								<a href="#">
									<h5>{ca.product.name}</h5>
								</a>

								<h6>Quantity : {ca.quatity || 1}</h6>
								<div className="quatity">
									<div
										className="quatity-icon text-white px-2 py-1 bg-success rounded-circle"
										onClick={() => {
											decrease(ca.product._id);
										}}
									>
										<i className="fas fa-angle-double-left"></i>
									</div>
									<div style={{ fontSize: 25 }}>|</div>
									<div
										className="quatity-icon text-white px-2 py-1 bg-success rounded-circle"
										onClick={() => {
											increase(ca.product._id);
										}}
									>
										<i className="fas fa-angle-double-right"></i>
									</div>
								</div>
								<span>Price: {ca.product.price}</span>
							</div>
							{/* px-2 py-1 rounded-circle bg-danger  */}
							<div
								style={{ height: "fit-content", borderRadius: 50 }}
								className=" single-shopping-remove"
								onClick={() => {
									remove(ca.product._id);
								}}
							>
								<i className="far fa-times-circle"></i>
							</div>
						</li>{" "}
					</>
				);
			})}
		</>
	);
	return (
		<>
			<ul className="ul-cart">
				{/* <li className="single-shopping-cart">
					<div className="single-shopping-image">
						<a href="#">
							<img className="img-fuild" src={img} alt="image" />
						</a>
					</div>
					<div className="single-shopping-title">
						<a href="#">
							<h5>San pham áo siêu đẹp loon</h5>
						</a>

						<h6>Qty : 1</h6>
						<span>Gia: 9.000.0000 Đ</span>
					</div>
					<div className="single-shopping-remove">
						<i className="fa fa-times-circle"></i>
					</div>
				</li>
				<li className="single-shopping-cart">
					<div className="single-shopping-image">
						<a href="#">
							<img className="img-fuild" src={img1} alt="image" />
						</a>
					</div>
					<div className="single-shopping-title">
						<a href="#">
							<h5>San pham áo siêu đẹp loon</h5>
						</a>

						<h6>Qty : 1</h6>
						<span>Gia: 9.000.0000 Đ</span>
					</div>
					<div className="single-shopping-remove">
						<i className="fa fa-times-circle"></i>
					</div>
				</li>
				<li className="single-shopping-cart">
					<div className="single-shopping-image">
						<a href="#">
							<img className="img-fuild" src={img} alt="image" />
						</a>
					</div>
					<div className="single-shopping-title">
						<a href="#">
							<h5>San pham áo siêu đẹp loon</h5>
						</a>

						<h6>Qty : 1</h6>
						<span>Gia: 9.000.0000 Đ</span>
					</div>
					<div className="single-shopping-remove">
						<i className="fa fa-times-circle"></i>
					</div>

				</li> */}

				{body}
			</ul>
			<div className="shopping-cart-total" style={{ marginTop: 50 }}>
				<div>Total :</div>
				<div>{total} VNĐ </div>
			</div>
			<div className="shopping-cart-btn">
				<Button
					className="mb-3 w-75"
					variant="success"
					to="/viewcart"
					as={Link}
				>
					View Cart
				</Button>
				<Button
					className="w-75"
					variant="info"
					to="/checkout"
					as={Link}
					disabled={cartDummy.length === 0}
				>
					Check out
				</Button>
			</div>
		</>
	);
};

export default Cart;
