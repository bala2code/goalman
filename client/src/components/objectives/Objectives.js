import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button } from "react-bootstrap";
import ManagerReview from "../ManagerReview";
import ManagerReviewForm from "../ManagerReviewForm";

import { withRouter } from "react-router-dom";
import { CATEGORY } from "../../config/constants";

class Objectives extends Component {
	componentDidMount() {
		this.getKRA();
	}

	getKRA() {
		const { id } = this.props.match.params;
		if (this.props.loggedUser) {
			this.props.fetchKra({ id });
		}
	}

	onKRASubmit() {

		if (this.props.loggedUser) {
			const { loggedUser: { user: { id } } } = this.props;
			const addedOn = new Date();
			const targetCompletion = new Date(new Date().setDate(new Date().getDate() + 60));
			const params = {
				"title": `Objective1 ${addedOn}`,
				"categoryId": "1",
				"objective": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
				"userId": id,
				"addedOnDate": addedOn.toDateString(),
				"targetCompletionDate": targetCompletion.toDateString()
			}
			this.props.updateKra({ params });
		}
	}

	renderManagerReview() {
		const kraResponse = this.props.kra.objectivesResponse[0];
		const { loggedUser: { user: { isReviewer } } } = this.props;

		if (!kraResponse) return null;
		const { id: objectiveId } = kraResponse;
		const { managerReview: { quarterlyCheckIn = '', feedback = '', rating = '', quarterlyCycle } = {} } = kraResponse;
		const managerReviewModel = {
			quarterlyCheckIn, feedback, rating, objectiveId, quarterlyCycle
		}

		return (
			<div>
				{(!isReviewer)
					? <ManagerReview {...managerReviewModel} />
					: <ManagerReviewForm {...managerReviewModel} />}
			</div>
		)
	}

	getCurrentFinancialYear() {
		var fiscalyear = "";
		var today = new Date();
		if ((today.getMonth() + 1) <= 3) {
			fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
		} else {
			fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
		}
		return fiscalyear
	}

	renderObjectives() {
		if (this.props.loggedUser && this.props.kra) {
			const kra = this.props.kra.objectivesResponse[0];
			const { categoryId, title, objective, quarterlyCycle, addedOnDate, targetCompletionDate } = kra;
			const currentYear = new Date().getFullYear();
			const nextYear = ` - ${new Date().getFullYear() + 1}`;
			return (
				<div className="container">
					<div>
						<p><span className="display-4">{CATEGORY[categoryId]}</span></p>
						<p className="h2">{title}</p>
						<p className="float-left">Annual: {this.getCurrentFinancialYear()} </p>
						<p className="float-right">Added on: {addedOnDate} </p>
						<textarea value={objective} disabled></textarea>
						<p>Target completion: {targetCompletionDate} </p>
						{/* <div className="clearBoth">
							<Button className="rounded-pill px-4 mr-3 float-right" variant="flat" size="xxl" onClick={() => this.onKRASubmit()}>Submit</Button>
						</div> */}
					</div>
					{this.renderManagerReview()}
				</div>
			)
		}
	}

	render() {
		if (!this.props.kra && !this.props.loggedUser) {
			return null;
		}

		return (
			<div className="objectives">
				{this.renderObjectives()}
			</div>
		);
	}
}

const mapStoP = state => {
	return {
		loggedUser: state.loggedUser,
		kra: state.objectivesReducer
	};
};
export default withRouter(connect(mapStoP, actions)((Objectives)));
