export const reviewUserByIdReducer = (state = null, action) => {
	switch (action.type) {
		case "FETCH_USER_BY_ID":
			return action.payload || false;
		default:
			return state;
	}
};

