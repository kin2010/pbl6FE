import React, { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import { AuthContext } from "../../Context/AuthContext";
const Toasts = () => {
	const { showToast, setShowToast } = useContext(AuthContext);
	const { message, type, show } = showToast;
	return (
		<>
			<Toast
				show={show}
				style={{
					position: "fixed",
					top: "25%",
					right: "10px",
					zIndex: 999,
				}}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: "",
					type: null,
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<div className="text-light text-center">{message}</div>
				</Toast.Body>
			</Toast>
		</>
	);
};

export default Toasts;
