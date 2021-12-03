import React from "react";
import { useState, useEffect } from "react";

import JsonData from "../data/data.json";

import { Button } from "reactstrap";
import Navi from "../HomePage/Navi";
import Header from "../HomePage/Header";
import Team from "../HomePage/Team";
import Footer from "../HomePage/Footer";
import Categories from "../HomePage/Categories";

const Home = () => {
	const [landingPageData, setLandingPageData] = useState({});
	useEffect(() => {
		setLandingPageData(JsonData);
	}, []);
	return (
		<>
			<Navi></Navi>
			<Header></Header>
			<Categories></Categories>
			<Team></Team>
			<Footer></Footer>
		</>
	);
};

export default Home;
