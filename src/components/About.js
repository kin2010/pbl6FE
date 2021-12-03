import React, { useContext, useEffect } from "react";
import Navi from "../HomePage/Navi";
import { CategoryContext } from "../Context/CategoryContext";
const About = () => {
	const {
		CategoryState: { products },
	} = React.useContext(CategoryContext);
	const { Get_Category, Get_Product } = useContext(CategoryContext);
	useEffect(() => {
		//category
		try {
			//	Get_Category();
			Get_Product();
		} catch (error) {}

		products.map((it) => {
			console.log(it.name);
		});
	}, []);

	return (
		<>
			<Navi></Navi>
			about
			{products.map((i) => {
				return <div>ada</div>;
			})}
		</>
	);
};

export default About;
