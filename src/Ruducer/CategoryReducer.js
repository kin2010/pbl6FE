export const CategoryReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case "GET_CATEGORY":
			return { ...state };
		case "GET_PRODUCT":
			return {
				...state,
				products: payload,
			};
		default:
			return state;
	}
};
