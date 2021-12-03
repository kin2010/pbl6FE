import {
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from "@coreui/react";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import ModalCategories from "./ModalCategories";
import { useSelector, useDispatch } from "react-redux";
import { findOne, removeCategories, showModal } from "./CategoriesSlice";
import { AuthContext } from "../../../../Context/AuthContext";
const Categories = () => {
	const { crumb, setCrumb } = useContext(AuthContext);
	useEffect(() => {
		setCrumb("Quản lí loại hàng");
	}, []);
	const Dummydata = [
		{
			_id: "6159c7d4e08b851f5b90adb0",
			name: "Thiết Bị Điện Tử",
		},
		{
			_id: "6159c7d4e08b851f5b90adb1",
			name: "TV & Thiết Bị Điện Gia Dụng",
		},
		{
			_id: "6159c7d4e08b851f5b90adb2",
			name: "Sức Khoẻ & Làm Đẹp",
		},
		{
			_id: "6159c7d4e08b851f5b90adb3",
			name: "Siêu Thị Tạp Hoá",
		},
		{
			_id: "6159c7d4e08b851f5b90adb4",
			name: "Hàng Gia Dụng Và Đời Sống",
		},
		{
			_id: "6159c7d4e08b851f5b90adb5",
			name: "Hàng Mẹ, Bé & Đồ Chơi",
		},
		{
			_id: "6159c7d4e08b851f5b90adb6",
			name: "Thời Trang Nữ",
		},
		{
			_id: "6159c7d4e08b851f5b90adb7",
			name: "Thời Trang Nam",
		},
	];
	const isShow = useSelector((state) => state.categories.isShow);
	const categories = useSelector((state) => state.categories.Dummydata);
	const dispatch = useDispatch();
	const [data, setData] = useState(Dummydata);
	const Remove = (index) => {
		//	console.log(index);
		const action = removeCategories(index);
		dispatch(action);
	};
	const Update = (index) => {
		const action = showModal(true);
		dispatch(action);
		const action2 = findOne(index);
		dispatch(action2);
	};

	const AddClick = () => {
		console.log("hi");
		const action = showModal(true);

		dispatch(action);
	};
	return (
		<>
			<Container>
				<Row className="mb-4">
					<Col xs={4}>
						<Button variant="primary" onClick={AddClick}>
							Add Categories
						</Button>
					</Col>
				</Row>
				<ModalCategories />
				<CTable>
					<CTableHead>
						<CTableRow>
							<CTableHeaderCell scope="col">#</CTableHeaderCell>
							<CTableHeaderCell scope="col">Categories</CTableHeaderCell>
							<CTableHeaderCell scope="col">
								Description
							</CTableHeaderCell>
							<CTableHeaderCell scope="col">Action</CTableHeaderCell>
						</CTableRow>
					</CTableHead>
					<CTableBody>
						{categories.map((i, index) => {
							return (
								<>
									<CTableRow key={i._id}>
										<CTableHeaderCell
											scope="row"
											className="text-center"
										>
											{index + 1}
										</CTableHeaderCell>
										<CTableDataCell>{i?.name}</CTableDataCell>
										<CTableDataCell>
											{i?.desc ? i.desc : "-----"}
										</CTableDataCell>
										<CTableDataCell>
											<div className="d-flex f-column justify-content-between w-75 ">
												<Button
													variant="danger"
													onClick={() => Remove(i?._id)}
												>
													Remove
												</Button>
												<Button
													variant="success"
													onClick={() => Update(i?._id)}
												>
													Edit
												</Button>
											</div>
										</CTableDataCell>
									</CTableRow>
								</>
							);
						})}
						{/* <CTableRow>
							<CTableHeaderCell scope="row">1</CTableHeaderCell>
							<CTableDataCell>Mark</CTableDataCell>
							<CTableDataCell>Otto</CTableDataCell>
							<CTableDataCell>@mdo</CTableDataCell>
						</CTableRow>
						<CTableRow>
							<CTableHeaderCell scope="row">2</CTableHeaderCell>
							<CTableDataCell>Jacob</CTableDataCell>
							<CTableDataCell>Thornton</CTableDataCell>
							<CTableDataCell>@fat</CTableDataCell>
						</CTableRow>
						<CTableRow>
							<CTableHeaderCell scope="row">3</CTableHeaderCell>
							<CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
							<CTableDataCell>@twitter</CTableDataCell>
						</CTableRow> */}
					</CTableBody>
				</CTable>
			</Container>
		</>
	);
};

export default Categories;
