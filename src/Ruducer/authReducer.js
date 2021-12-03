export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user, isLoading },
	} = action;

	switch (type) {
		case "SET_AUTH":
			return {
				...state,
				isLoading,
				isAuthenticated,
				user,
			};

		default:
			return state;
	}
};
