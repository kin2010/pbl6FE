import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoriesApi from "../../../../api/CategoriesApi";

const Dummydata = [
	{
		_id: "6159c7d4e08b851f5b90adb0",
		name: "Thiết Bị Điện Tử",
	},
];
export const getCategories = createAsyncThunk(
	"/categores",
	async (params, thunkAPI) => {
		const res = await CategoriesApi.get();
		return res.data;
	}
);
const categorie = createSlice({
	name: "categories",
	initialState: {
		isLoading: false,
		Dummydata,
		isShow: false,
		cate: { name: "", desc: "" },
	},
	reducers: {
		addCategories: (state, action) => {
			// const newPhoto = action.payload;
			const length = action.payload.name?.length;
			state.Dummydata.push({ ...action.payload, _id: length });
			state[action.payload.name] = "123321";
			console.log("zz", state[action.payload.name]);
		},
		removeCategories: (state, action) => {
			const idremove = action.payload;
			const index = state.Dummydata.findIndex((i) => i._id === idremove);
			// return state.Dummydata.filter(
			// 	(categorie) => categorie._id !== toString(idremove)
			// );
			state.Dummydata.splice(index, 1);
		},
		showModal: (state, action) => {
			console.log(action);
			state.isShow = action.payload;
		},
		findOne: (state, action) => {
			state.cate = state.Dummydata.find((i) => i._id === action.payload);
		},
		updateModal: (state, action) => {
			// state.isShow = action.payload.isShow;
			console.log(action);
			const idremove = state.Dummydata.findIndex(
				(i) => i._id === action.payload.index
			);
			state.Dummydata.splice(idremove, 1, action.payload.categorie);
		},
		resetCate: (state, action) => {
			state.cate = { name: "", desc: "" };
		},
	},
	extraReducers: {
		[getCategories.fulfilled]: (state, action) => {
			state.Dummydata = action.payload;
			state.isLoading = false;
		},
		[getCategories.pending]: (state, action) => {
			state.isLoading = true;
		},
	},
});
const { reducer, actions } = categorie;
export const {
	addCategories,
	showModal,
	removeCategories,
	findOne,
	updateModal,
	resetCate,
} = actions;
export default reducer;
