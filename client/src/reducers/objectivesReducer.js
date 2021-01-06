export const objectivesReducer = (state = null, action) => {
	switch (action.type) {
		case "FETCH_GOALS":
			return action.payload || false;
		case "FETCH_KRA":
			return action.payload || false;
		default:
			return state;
	}
};
