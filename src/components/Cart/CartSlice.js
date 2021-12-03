import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const cart = createSlice({
	name: "carts",
	initialState: { cartDummy: [] },
	reducers: {
		addCartsQuantity: (state, action) => {
			const index = state.cartDummy.findIndex(
				(cart) => cart.product._id === action.payload.product._id
			);
			if (index !== -1) {
				// const index = state.cartDummy.findIndex(
				// 	(cart) => cart.product._id === action.payload._id
				// );

				state.cartDummy[index].quatity =
					state.cartDummy[index].quatity + action.payload.quantity;
			} else {
				console.log("addd");
				state.cartDummy.push({
					product: action.payload.product,
					quatity: action.payload.quantity,
				});
			}
		},
		addCarts: (state, action) => {
			console.log(action);
			const index = state.cartDummy.findIndex(
				(cart) => cart.product._id === action.payload._id
			);
			if (index !== -1) {
				// const index = state.cartDummy.findIndex(
				// 	(cart) => cart.product._id === action.payload._id
				// );
				console.log(index);
				state.cartDummy[index].quatity = state.cartDummy[index].quatity + 1;
			} else {
				console.log("addd");
				state.cartDummy.push({ product: action.payload, quatity: 1 });
			}
		},
		increaseCart: (state, action) => {
			const index = state.cartDummy.findIndex(
				(i) => i.product._id === action.payload
			);

			state.cartDummy[index].quatity = state.cartDummy[index].quatity + 1;
		},
		decreaseCart: (state, action) => {
			const index = state.cartDummy.findIndex(
				(i) => i.product._id === action.payload
			);
			if (state.cartDummy[index].quatity !== 1) {
				state.cartDummy[index].quatity = state.cartDummy[index].quatity - 1;
			} else {
				state.cartDummy.splice(index, 1);
			}
		},
		removeCart: (state, action) => {
			const index = state.cartDummy.findIndex(
				(i) => i.product._id === action.payload
			);

			state.cartDummy.splice(index, 1);
		},
		removeAll: (state, action) => {
			state.cartDummy = [];
		},
	},
});
const { reducer, actions } = cart;
export const {
	addCarts,
	increaseCart,
	decreaseCart,
	removeAll,
	removeCart,
	addCartsQuantity,
} = actions;
export default reducer;
