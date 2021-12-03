import React from "react";
import {
	CSidebar,
	CSidebarBrand,
	CSidebarNav,
	CSidebarToggler,
	CNavItem,
	CNavTitle,
	CBadge,
	CNavGroup,
} from "@coreui/react";
import { cilSpeedometer, cilPuzzle, cilHome } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AppSidebar = () => {
	const [unfoldable, setUfordable] = useState(false);
	const [sidebarShow, setSidebarshow] = useState(true);
	return (
		<div>
			<CSidebar
				position="fixed"
				// unfoldable={unfoldable}
				visible={sidebarShow}
				onVisibleChange={(visible) => {
					setSidebarshow(visible);
				}}
			>
				<CSidebarBrand>Administration</CSidebarBrand>
				<CSidebarNav>
					<CNavTitle>Nav Title</CNavTitle>
					<CNavItem href="#">
						<CIcon customClassName="nav-icon" icon={cilHome} />
						<Link className="text-light" to="/admin/overview" as={Link}>
							Trang chủ
						</Link>
						{/* <CBadge color="primary ms-auto">NEW</CBadge> */}
					</CNavItem>
					<CNavItem href="#">
						<CIcon customClassName="nav-icon" icon={cilSpeedometer} />
						<Link className="text-light" to="/admin/product" as={Link}>
							Quản lí sản phẩm
						</Link>
						{/* <CBadge color="primary ms-auto">NEW</CBadge> */}
					</CNavItem>
					<CNavItem href="#">
						<CIcon customClassName="nav-icon" icon={cilSpeedometer} />
						<Link className="text-light" to="/admin/categories" as={Link}>
							Quản lí loại hàng
						</Link>
					</CNavItem>
					<CNavItem href="#">
						<CIcon customClassName="nav-icon" icon={cilSpeedometer} />
						<Link className="text-light" to="/admin/order" as={Link}>
							Quản lí đơn hàng
						</Link>
					</CNavItem>
					<CNavItem href="#">
						<CIcon customClassName="nav-icon" icon={cilSpeedometer} />
						<Link className="text-light" to="/admin/categories">
							Quản lí shop
						</Link>
					</CNavItem>
					<CNavItem href="#">
						<CIcon customClassName="nav-icon" icon={cilSpeedometer} />
						<Link className="text-light" to="/admin/user" as={Link}>
							Quản lí người dùng
						</Link>
					</CNavItem>

					<CNavGroup toggler="Nav dropdown">
						<CNavItem href="#">
							<CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav
							dropdown item
						</CNavItem>
						<CNavItem href="#">
							<CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav
							dropdown item
						</CNavItem>
					</CNavGroup>
				</CSidebarNav>
				<CSidebarToggler
					className="d-none d-lg-flex"
					onClick={() => setUfordable(!unfoldable)}
				/>
			</CSidebar>
		</div>
	);
};

export default AppSidebar;
