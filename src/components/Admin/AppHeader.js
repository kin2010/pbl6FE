import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
	CContainer,
	CHeader,
	CHeaderBrand,
	CHeaderDivider,
	CHeaderNav,
	CHeaderToggler,
	CNavLink,
	CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";
import AppHeaderDropdown from "./AppHeaderDropDown";
import { Breadcrumb } from "react-bootstrap";
import BreadCrumb from "../Breadcrumb/BreadCrumb";
import { AuthContext } from "../../Context/AuthContext";

// import { AppBreadcrumb } from "./index";
// import { AppHeaderDropdown } from "./header/index";
// import { logo } from "src/assets/brand/logo";

const AppHeader = () => {
	//   const dispatch = useDispatch()
	//   const sidebarShow = useSelector((state) => state.sidebarShow)
	const { crumb, setCrumb } = useContext(AuthContext);
	return (
		<CHeader position="sticky" className="mb-4">
			<CContainer fluid>
				<CHeaderToggler
					className="ps-1 "
					// x
				>
					<CIcon icon={cilMenu} size="lg" />
				</CHeaderToggler>
				<CHeaderBrand className="mx-auto d-md-none" to="/">
					<CIcon icon={cilEnvelopeOpen} height={48} alt="Logo" />
				</CHeaderBrand>
				<CHeaderNav className="d-none d-md-flex me-auto">
					<CNavItem>
						<CNavLink
							to="/dashboard"
							component={NavLink}
							activeClassName="active"
						>
							Dashboard
						</CNavLink>
					</CNavItem>
					<CNavItem>
						<CNavLink href="#">Users</CNavLink>
					</CNavItem>
					<CNavItem>
						<CNavLink href="#">Settings</CNavLink>
					</CNavItem>
				</CHeaderNav>
				<CHeaderNav>
					<CNavItem>
						<CNavLink href="#">
							<CIcon icon={cilBell} size="lg" />
						</CNavLink>
					</CNavItem>
					<CNavItem>
						<CNavLink href="#">
							<CIcon icon={cilList} size="lg" />
						</CNavLink>
					</CNavItem>
					<CNavItem>
						<CNavLink href="#">
							<CIcon icon={cilEnvelopeOpen} size="lg" />
						</CNavLink>
					</CNavItem>
				</CHeaderNav>
				<CHeaderNav className="ms-3">
					<AppHeaderDropdown />
				</CHeaderNav>
			</CContainer>
			<CHeaderDivider />
			<CContainer fluid>
				{/* <AppBreadcrumb /> */}

				<BreadCrumb crumb={crumb}></BreadCrumb>
			</CContainer>
		</CHeader>
	);
};

export default AppHeader;
