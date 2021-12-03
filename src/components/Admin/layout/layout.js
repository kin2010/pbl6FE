import React from "react";
import AppSidebar from "../Admin";
import AppContent from "../AppContent";
import AppHeader from "../AppHeader";
import "./layout.css";
const DefaultLayout = () => {
	return (
		<div style={{ marginTop: -110 }}>
			<AppSidebar />
			<div
				className="wrapper d-flex flex-column min-vh-100 bg-light"
				style={{ marginLeft: 256 }}
			>
				<AppHeader />
				<div className="body flex-grow-1 px-3">
					<AppContent />
				</div>
			</div>
		</div>
	);
};

export default DefaultLayout;
