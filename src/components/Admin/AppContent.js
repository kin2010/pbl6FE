import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import Categories from "./components/Categories/Categories";
import Home from "./components/Home/Home";
import Order from "./components/Order";
import OverView from "./components/OverView";
import Product from "./components/Product/Product";
import ProductUpdate from "./components/Product/ProductUpdate";
import User from "./components/User";

const AppContent = () => {
	return (
		<>
			<Suspense fallback={<div></div>}>
				<Switch>
					<Route exact path="/admin" render={(props) => <Home />} />
					<Route
						path="/admin/categories"
						render={(props) => <Categories {...props} />}
					/>
					<Route exact path="/admin/product" component={Product} />
					<Route exact path="/admin/overview" component={OverView} />
					<Route exact path="/admin/order" component={Order} />
					<Route exact path="/admin/user" component={User} />
					<Route
						exact
						path="/admin/product/:id"
						component={ProductUpdate}
					/>
				</Switch>
			</Suspense>
		</>
	);
};

export default AppContent;
