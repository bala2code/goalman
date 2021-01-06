import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { objectivesReducer } from "./objectivesReducer";
import { reviewUserListReducer } from "./reviewUserListReducer";
import { reviewUserByIdReducer } from "./reviewUserByIdReducer";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
	objectivesReducer: objectivesReducer,
	reviewUserList: reviewUserListReducer,
	reviewUserByIdList: reviewUserByIdReducer,
	loggedUser: userReducer,
	form: reduxForm
});
