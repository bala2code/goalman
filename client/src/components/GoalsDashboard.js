import React, { Component } from "react";
import ObjectivesList from "./objectives/ObjectivesList";

class GoalsDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "InProgress"
		};
	}

	render() {
		return (
			<div className="container mygoal goalsdashboard">
				<h1 className="display-4">Dashboard</h1>
				<p>You can to add maximum of 5 goals for each category by clicking the "Add Goal" button.</p>
				
				<ObjectivesList categoryId={"1"} />
				<ObjectivesList categoryId={"2"} />
				<ObjectivesList categoryId={"3"} />
			</div>
		);
	}
}

export default GoalsDashboard;
