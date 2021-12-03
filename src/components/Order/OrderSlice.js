import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderApi from "../../api/OrderApi";
export const CreateOrder = createAsyncThunk(
	"/orders/create",
	async (params, APIthunk) => {
		const res = await OrderApi.createOrder(params);
		return res.data;
	}
);
export const Myorder = createAsyncThunk(
	"/orders/myorder",
	async (params, APIthunk) => {
		const res = await OrderApi.Myorder(params);
		return res.data;
	}
);
export const GetAllOrder = createAsyncThunk(
	"/orders/orders",
	async (params, APIthunk) => {
		const res = await OrderApi.GetAll(params);
		return res.data;
	}
);
const order = createSlice({
	name: "orders",
	initialState: {
		orders: [],
		isLoading: false,
		orderHistory: [],
		orderDetail: [],
		mapping: [],
		allOrder: [],
	},
	reducers: {
		createOrder: (state, action) => {},
		orderdetail: (state, action) => {
			console.log(action.payload);
			const index = state.orderHistory.findIndex(
				(i) => i._id === action.payload
			);
			state.orderDetail = state.orderHistory[index];
		},
		mapping: (state, action) => {
			state.mapping = [];
			if (state.orderDetail) {
				state.orderDetail.product.map((a, b) => {
					const index = state.mapping.findIndex(
						(i) => i.product._id === a._id
					);
					if (index === -1) {
						state.mapping.push({ product: a, quantity: 1 });
					} else {
						state.mapping[index].quantity =
							state.mapping[index].quantity + 1;
					}
				});
			}
		},
	},
	extraReducers: {
		[CreateOrder.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.orders.push(action.payload);
		},
		[CreateOrder.pending]: (state, action) => {
			state.isLoading = true;
		},
		[Myorder.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.orderHistory = action.payload;
		},
		[Myorder.pending]: (state, action) => {
			state.isLoading = true;
		},
		[GetAllOrder.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.allOrder = action.payload;
		},
		[GetAllOrder.pending]: (state, action) => {
			state.isLoading = true;
		},
	},
});
const { reducer, actions } = order;
export const { createOrder, orderdetail, mapping } = actions;
export default reducer;
