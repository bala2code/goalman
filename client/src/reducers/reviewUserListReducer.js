export const reviewUserListReducer = (state = null, action) => {
	switch (action.type) {
		case "FETCH_ALL_USER":
			return action.payload || false;
		default:
			return state;
	}
};



