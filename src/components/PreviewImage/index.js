import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../Context/CategoryContext";

const ImagePreviewModal = () => {
	// Contexts
	const {
		showImagePreviewModal,
		setShowImagePreviewModal,
		imagePreview,
		setImagePreview,
	} = useContext(CategoryContext);

	// useEffect(() =>{
	// 	console.log(imagePreview)
	// }, [showImagePreviewModal])

	const closeDialog = () => {
		setShowImagePreviewModal(false);
		setImagePreview("");
	};

	return (
		<Modal
			show={showImagePreviewModal}
			onHide={closeDialog}
			dialogClassName="my-modal-previewimage"
		>
			<Modal.Header closeButton>
				<Modal.Title className="formtitle"> Preview</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="preview-image">
					<img
						src={imagePreview}
						alt="view"
						width="450"
						height="450"
						className="img-preview"
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeDialog}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ImagePreviewModal;
