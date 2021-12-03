import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const User = () => {
	const { crumb, setCrumb } = useContext(AuthContext);
	useEffect(() => {
		setCrumb("Quản lí người dùng");
	}, []);
	return <>user</>;
};

export default User;
