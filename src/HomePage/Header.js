import React, { useState } from "react";

import { Carousel, Container } from "react-bootstrap";
import img from "../img/banner_img_01.jpg";
import img2 from "../img/banner_img_02.jpg";
import img3 from "../img/banner_img_03.jpg";
import sl1 from "../img/sl1.png";
import sl2 from "../img/sl2.png";
import sl3 from "../img/sl3.png";
import sl4 from "../img/sl4.jpg";
import sl5 from "../img/sl5.jpg";
const Header = () => {
	const [index, setIndex] = useState(1);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<>
			<>
				<Carousel fade activeIndex={index} onSelect={handleSelect}>
					{/* <Carousel.Item >
						<img
							className="d-block w-75 "
							src={sl3}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>
								Nulla vitae elit libero, a pharetra augue mollis
								interdum.
							</p>
						</Carousel.Caption>
					</Carousel.Item> */}
					{/* <Carousel.Item className="d-flex align-items-center">
						<img
							className="d-block w-100"
							src={sl5}
							alt="Second slide"
							style={{ height: 400 }}
						/>

						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
						</Carousel.Caption>
					</Carousel.Item> */}
					<Carousel.Item className="d-flex align-items-center">
						<img
							className="d-block w-100"
							src={sl5}
							alt="Second slide"
							style={{ height: 400 }}
						/>

						<Carousel.Caption>
							<h3>Hãy đến với chúng tôi</h3>
							<h3 className="text-warning">
								Mua mọi thứ với một cú nhấp chuột
							</h3>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item className="d-flex align-items-center">
						<img
							className="d-block w-100"
							src={sl1}
							alt="Second slide"
							style={{ height: 400 }}
						/>

						<Carousel.Caption>
							<h3 className="text-black">
								Sự <strong className="text-danger"> Uy Tín </strong>luôn
								đặt lên hàng đầu
							</h3>
							<h3 className="text-primary">
								Với hơn 10 năm kinh nghiệm với hàng triệu khách hàng
							</h3>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item className="d-flex align-items-center">
						<img
							className="d-block w-100"
							src={sl4}
							alt="Second slide"
							style={{ height: 400 }}
						/>

						<Carousel.Caption>
							<h3 className="text-black">
								Sự <strong className="text-danger"> Uy Tín </strong>luôn
								đặt lên hàng đầu
							</h3>
							<h3 className="text-primary">
								Với hơn 10 năm kinh nghiệm với hàng triệu khách hàng
							</h3>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</>
		</>
	);
};

export default Header;
