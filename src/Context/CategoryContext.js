import axios from "axios";

import { createContext, useReducer, useEffect, useState } from "react";
import { CategoryReducer } from "../Ruducer/CategoryReducer";
import { getToken } from "../Utils/Common";
import { apiURL } from "./Constants";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../components/Admin/components/Categories/CategoriesSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getProduct } from "../components/Shop/ShopSlice";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./AuthContext";
export const CategoryContext = createContext();
const CategoryContextProvider = ({ children }) => {
	const [CategoryState, dispatch] = useReducer(CategoryReducer, {
		category: [],
		products: [],
	});
	const [page, setPage] = useState(1);
	const [searchCate, setSearchCate] = useState("");
	const [imagePreview, setImagePreview] = useState("");
	const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
	const dis = useDispatch();
	const {
		authState: { isAuthenticated },
	} = useContext(AuthContext);
	useEffect(() => {
		return console.log("cate");
	}, []);
	useEffect(() => {
		console.log(getToken());
		console.log(axios);
		const fetchData = async () => {
			try {
				const action = await dis(getCategories());
				const dummy = unwrapResult(action);
				console.log(dummy);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [isAuthenticated]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				// const params = {
				// 	name: "Headphone 22",
				// 	price: 300000,
				// 	category: "615dd425233e1a491235d300",
				// 	avatar:
				// 		"https://res.cloudinary.com/dfi8bluhn/image/upload/v1636177764/pbl6/1636177756413-Screen_Shot_2021-11-05_at_01.49.19_n9yevx.png",
				// 	shop: "618617819cefa3e5b594162a",
				// };
				let params;
				if (searchCate === "") {
					params = { limit: 6, page: page };
				} else {
					console.log("searchcate", searchCate);
					params = { limit: 6, page: page, category: searchCate };
				}
				const action = await dis(getProduct(params));
				const dummy = unwrapResult(action);
				console.log(dummy);
			} catch (error) {
				console.log(error);
			}

			//	console.log(dummy);
		};
		return fetchData();
	}, [isAuthenticated, page, searchCate]);

	const Get_Category = async () => {
		try {
			const response = await axios.get(`${apiURL}/categories`);
			console.log(response);
			//success
			if (response.status === 200) {
				dispatch({
					type: "GET_CATEGORY",
					payload: {
						category: response.data,
					},
				});
			}
		} catch (error) {
			console.log(error.response);
		}
	};
	// useEffect(() => {
	// 	Get_Category();
	// }, []);

	// useEffect(() => {
	// 	if (getToken()) {
	// 		async function fetchdata() {
	// 			try {
	// 				const responce = await axios.get(`${apiURL}/shops`, {
	// 					headers: {
	// 						Authorization: `Bearer ${getToken()}`,
	// 					},
	// 					params: {
	// 						limit: 10,
	// 						page: 1,
	// 					},
	// 				});

	// 				console.log(responce);
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		}
	// 		fetchdata();
	// 	}
	// });

	// Get product
	const Get_Product = async () => {
		try {
			const productDummy = [
				{
					id: 123,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 5000,
				},
				{
					id: 1234,
					image: "https://icdn.dantri.com.vn/thumb_w/660/2021/10/20/si20goal-1634705885493.jpg",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 3000,
				},
				{
					id: 1235,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 2000,
				},
				{
					id: 1236,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 5000,
				},
				{
					id: 1237,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 5000,
				},
				{
					id: 1238,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 5000,
				},
				{
					id: 1239,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 5000,
				},
				{
					id: 12310,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 5000,
				},
				{
					id: 12311,
					image: "https://firebasestorage.googleapis.com/v0/b/appkinne.appspot.com/o/images%2FB6CF2091-D45B-4204-BD75-5DEE6B3776ED.jpeg?alt=media&token=8d8ffe29-6868-4c50-948c-f87e4b2f4b1e",
					name: "Vip pro",
					desc: "hangf xin  xo",
					price: 5000,
				},
			];
			// const repsonce=await axios.get(`${apiURL}/categories`)
			dispatch({ type: "GET_PRODUCT", payload: productDummy });
		} catch (error) {
			console.log(error);
		}
	};
	const data = {
		Get_Category,
		Get_Product,
		CategoryState,
		showImagePreviewModal,
		setShowImagePreviewModal,
		imagePreview,
		setImagePreview,
		page,
		setPage,
		searchCate,
		setSearchCate,
	};
	return (
		<CategoryContext.Provider value={data}>
			{children}
		</CategoryContext.Provider>
	);
};

export default CategoryContextProvider;
