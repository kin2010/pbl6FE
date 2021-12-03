import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
	addCategories,
	resetCate,
	showModal,
	updateModal,
} from "./CategoriesSlice";

const ModalCategories = () => {
	const [show, setShow] = useState(false);
	const closeDialog = () => {
		const action = showModal(false);
		dispatch(action);
		const action2 = resetCate();
		dispatch(action2);
	};
	const cate = useSelector((state) => state.categories.cate);

	const [formCate, setFormCate] = useState(cate);
	useEffect(() => {
		// setFormCate({
		// 	name: cate?.name | "",
		// 	desc: cate?.desc | "",
		// });
		setFormCate(cate);
	}, [cate]);
	const { name, desc } = formCate;
	const dispatch = useDispatch();
	const isShow = useSelector((state) => state.categories.isShow);
	const onChangeCategories = (e) => {
		setFormCate({
			...formCate,
			[e.target.name]: [e.target.value],
		});
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		if (cate.name) {
			const payload = { index: cate._id, categorie: formCate };
			const action1 = updateModal(payload);
			dispatch(action1);
		} else {
			const action = addCategories(formCate);
			dispatch(action);
		}

		closeDialog();
	};

	return (
		<>
			<Modal show={isShow} onHide={closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>
						{cate.name ? "Update" : "Add"} Categories
					</Modal.Title>
				</Modal.Header>
				<Form onSubmit={onSubmit}>
					<Modal.Body>
						<Form.Group>
							<Form.Control
								type="text"
								placeholder="Categories"
								name="name"
								required
								aria-describedby="Name"
								value={name}
								onChange={onChangeCategories}
							/>
							<Form.Text id="Categories" muted>
								Required
							</Form.Text>
						</Form.Group>
						<Form.Group>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Description"
								name="desc"
								value={desc}
								onChange={onChangeCategories}
							/>
						</Form.Group>
						{/* <Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='select'
							value={status}
							name='status'
							onChange={onChangeUpdatedPostForm}
						>
							<option value='TO LEARN'>TO LEARN</option>
							<option value='LEARNING'>LEARNING</option>
							<option value='LEARNED'>LEARNED</option>
						</Form.Control>
					</Form.Group> */}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeDialog}>
							Cancel
						</Button>
						<Button variant="primary" type="submit">
							{cate.name ? "Update" : "Add"}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default ModalCategories;
