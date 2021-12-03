import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getRoleID, getToken } from "./Common";

const PublicRoute = ({ component: Component, ...rest }) => {
	console.log("ok");
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!getToken()) {
					console.log("log");
					return <Component {...rest} {...props} />;
				} else {
					const role = getRoleID();
					if (role === "1") return <Redirect to="/admin" />;
					else if (role === "Customer") return <Redirect to="/shop" />;
					else return <Redirect to="/shop" />;
					// else if (role === '0') return <Redirect to='/admin'/>;
				}
			}}
		/>
	);
};
export default PublicRoute;
