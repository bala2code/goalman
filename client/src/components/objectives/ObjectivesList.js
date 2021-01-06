import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { CATEGORY } from "../../config/constants";
import _ from "lodash";

import {
	Link, withRouter
} from "react-router-dom";

class ObjectivesList extends Component {
	componentDidMount() {
		this.getGoals();
	}

	getGoals() {
		if (this.props.loggedUser) {
			let { loggedUser: { user: { id } } } = this.props;
			const { id: paramsId } = this.props.match.params;

			this.props.fetchGoals({ userId: paramsId || id });

			if (paramsId) {
				this.props.fetchUserById({ userId: paramsId });
			}
		}
	}

	renderReviewColumn({ categoryId, objective }) {
		const { managerReview: { quarterlyCycle = '', quarterlyCheckIn = 'Open', reviewUpdated = '' } = '', addedOnDate, id } = objective;
		return (
			<tr className="row small">
				<td className="col-2 td">Q1: {quarterlyCycle === "Q1" ? <a href={`/objectives/${id}`} title={quarterlyCheckIn}>{reviewUpdated}</a> : '-'}</td>
				<td className="col-2 td">Q2: {quarterlyCycle === "Q2" ? <a href={`/objectives/${id}`} title={quarterlyCheckIn}>{reviewUpdated}</a> : '-'}</td>
				<td className="col-2 td">Q3: {quarterlyCycle === "Q3" ? <a href={`/objectives/${id}`} title={quarterlyCheckIn}>{reviewUpdated}</a> : '-'}</td>
				<td className="col-2 td">Q4: {quarterlyCycle === "Q4" ? <a href={`/objectives/${id}`} title={quarterlyCheckIn}>{reviewUpdated}</a> : '-'}</td>
				<td className="col-4 td">Set On: {addedOnDate}</td>
			</tr>
		)
	}

	renderObjectivesList() {
		if (this.props.loggedUser && this.props.userObjectives) {
			const objectives = this.props.userObjectives.objectivesResponse;
			const { categoryId } = this.props;
			const catergoryList = _.groupBy(objectives, 'categoryId');
			const catergoryListLength = catergoryList[categoryId] ? catergoryList[categoryId].length : 0;
			const MAX_OBJECTIVE_PER_CATEGORY = 5;

			return (
				<div>
					<div className="row">
						<div className="col-12">
							<p className="h2 float-left">{CATEGORY[categoryId]}</p><p className="medium float-left catergoryCount" title="You have to add max 5 goals for each category"> ({catergoryListLength}/5)</p>
							{(catergoryListLength < MAX_OBJECTIVE_PER_CATEGORY)
								? <Link to="/objectives" variant="flat" size="xxl" className="btn btn-flat float-right" role="button">
									Add Goal
								</Link>
								: null}
						</div>
					</div>
					{
						(objectives.length > 0)
							? <div className="row">

								<ol className="col-12">
									{objectives.map((objective, idx) => {
										return (
											categoryId === objective.categoryId
												? <li>
													<div className="row">
														<div key={objective.id} className="col-2 float-left objectiveTitle">
															<Link title={objective.title} to={`/objectives/${objective.id}`}>{objective.title}</Link>
														</div>
														<div className="col-9 float-left ">
															<table className="table table-borderless">
																{this.renderReviewColumn({ categoryId, objective })}
															</table>
														</div>
													</div>
												</li>
												: null
										)
									})}
								</ol>
							</div>
							: "Add an objective"
					}
				</div >
			)
		}
	}

	render() {
		if (!this.props.userObjectives && !this.props.loggedUser) {
			return null;
		}

		return (
			<div className="objectivesList">
				{this.renderObjectivesList()}
			</div>
		);
	}
}

const mapStoP = state => {
	return {
		loggedUser: state.loggedUser,
		userObjectives: state.objectivesReducer
	};
};

ObjectivesList = connect(mapStoP, actions)(ObjectivesList);

export default withRouter(ObjectivesList);
