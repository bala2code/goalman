import axios from "axios";

// Fetch the current user details
export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/user");

	dispatch({ type: "FETCH_USER", payload: res.data });
};

// Fetch the current user details
export const fetchAllUser = () => async dispatch => {
	const res = await axios.get("/api/user/all");
	dispatch({ type: "FETCH_ALL_USER", payload: res.data });
};

// Fetch the current user details
export const fetchUserById = ({ userId }) => async dispatch => {
	const res = await axios.get(`/api/user/${userId}`);

	dispatch({ type: "FETCH_USER_BY_ID", payload: res.data });
};

// Fetch all the objectives by user id
export const fetchGoals = ({ userId }) => async dispatch => {
	const res = await axios.get(`/api/objectives?userId=${userId}`);

	dispatch({ type: "FETCH_GOALS", payload: res.data });
};

// Fetch a particular objective based on the id 
export const fetchKra = ({ id }) => async dispatch => {
	const res = await axios.get(`/api/objectives?id=${id}`);

	dispatch({ type: "FETCH_KRA", payload: res.data });
};

// Create a new objectives
export const createKRA = ({ params, userId, history }) => async dispatch => {
	console.log("action create", params);
	const res = await axios.post(`/api/objectives`, { data: { params, userId } });
	const { id } = res.data.objectivesResponse;

	history.push(`/objectives/${id}`);
	dispatch({ type: "CREATE_KRA", payload: res.data });
};

// Update a particular value of an objective
export const updateKra = ({ params, objectiveId, history, reviewUserId }) => async dispatch => {
	console.log("action update", params, history, reviewUserId);
	const res = await axios.patch(`/api/objectives/${objectiveId}`, { data: { params, objectiveId } });
	history.push(`/review/${reviewUserId}`);
	dispatch({ type: "UPDATE_KRA", payload: res.data });
};


