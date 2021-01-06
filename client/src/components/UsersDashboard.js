import React, { Component } from "react";
import ObjectivesList from "./objectives/ObjectivesList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class UsersDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "InProgress"
		};
	}

	componentWillMount() {
		this.getAllUsers();
	}

	getAllUsers() {
		this.props.fetchAllUser();
	}

	renderUserList() {
		const { reviewUserList } = this.props;

		if (!reviewUserList) {
			return null
		}

		const { reviewUserList: { user = [] } = {} } = this.props;
		const { user: { id } } = this.props.loggedUser;

		if (user && user.length > 0) {
			return (
				<ol>
					{user.map((usr, idx) => {
						if (usr.reportingMgrId === id) {
							return <li>
								<Link key={idx} to={`/review/${usr.id}`}>{usr.name} ({usr.empId} : {usr.role})</Link>
							</li>
						}
					})}
				</ol>
			)
		}
	}

	render() {
		return (
			<div className="container review userDashboard">
				<h1 className="display-4">User Dashboard</h1>
				<br />
				<p className="h2">Team1 {}</p>
				{this.renderUserList()}
			</div>
		);
	}
}

const mapStoP = state => {
	return {
		loggedUser: state.loggedUser,
		reviewUserList: state.reviewUserList
	};
};

export default connect(mapStoP, actions)(UsersDashboard);
