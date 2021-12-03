import { faCashRegister, faChartLine } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../../../Context/AuthContext";
import { CounterWidget } from "../Widgets/Widgets";
const OverView = () => {
	const { crumb, setCrumb } = useContext(AuthContext);
	useEffect(() => {
		setCrumb("Trang Chủ");
	}, []);
	return (
		<>
			<Container fluid>
				<Row>
					<Col xs={12} sm={6} xl={6} md={6} className="mb-4">
						<CounterWidget
							category="Customers"
							title="345k"
							period="Feb 1 - Apr 1"
							percentage={18.2}
							icon={faChartLine}
							iconColor="shape-secondary"
						/>
					</Col>
					<Col xs={12} sm={6} xl={6} md={6} className="mb-4">
						<CounterWidget
							category="Revenue"
							title="$43,594"
							period="Feb 1 - Apr 1"
							percentage={28.4}
							icon={faCashRegister}
							iconColor="shape-tertiary"
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default OverView;
