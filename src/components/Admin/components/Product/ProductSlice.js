import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ShopApi from "../../../../api/ShopApi";
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

export const getProduct = createAsyncThunk(
	"/product",
	async (params, thunkAPI) => {
		const res = await ShopApi.getProduct(params);
		return res.data;
	}
);
export const createProduct = createAsyncThunk(
	"/product/create",
	async (params, thunkAPI) => {
		const res = await ShopApi.createProduct(params);
		return res.data;
	}
);
const shop = createSlice({
	name: "shops",
	initialState: { productDummy, product: [], isLoading: false },
	reducers: {
		findOne: (state, action) => {
			// const t = parseInt(action.payload);
			// const a = state.productDummy.find(
			// 	(a) => a.id === parseInt(action.payload)
			// );
			// state.product = a;
			// console.log(action, a, t);
			const index = state.productDummy.findIndex(
				(i) => i._id === action.payload
			);
			state.product = state.productDummy[index];
		},
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => {
			state.productDummy = action.payload;
			state.isLoading = false;
		},
		[getProduct.pending]: (state, action) => {
			state.isLoading = true;
		},
		[createProduct.fulfilled]: (state, action) => {
			state.productDummy.push(action.payload);
			state.isLoading = false;
		},
	},
});
const { reducer, actions } = shop;
export const { findOne } = actions;
export default reducer;
