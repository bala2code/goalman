import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { ObjectivesField, ObjectivesFieldTextArea, ObjectivesFieldSelect } from "./objectivesField";
import _ from 'lodash';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter
} from "react-router-dom";

class ObjectivesForm extends Component {

	onKRASubmit() {
		const { history } = this.props;

		if (this.props.loggedUser) {
			const { objectivesParams: { objectivesForm } } = this.props;
			const { reviewUserByIdList: { user: { id: userId } } } = this.props;

			this.props.createKRA({ params: objectivesForm, userId, history });

			this.showToastr();
		}
	}

	showToastr() {
		return (
			<div role="alert" aria-live="assertive" aria-atomic="true" className="toast" data-autohide="false">
				<div className="toast-header">
					<svg className=" rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
						<rect fill="#007aff" width="100%" height="100%" /></svg>
					<strong className="mr-auto">Bootstrap</strong>
					<small>11 mins ago</small>
					<button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="toast-body">
					Hello, world! This is a toast message.
  				</div>
			</div>
		)
	}


	renderField({ label, name }) {
		return (
			<Field key={name} component={ObjectivesField} type={"text"} label={label} name={name} value={"Test..."} />
		)
	}

	renderFieldTextArea({ label, name }) {
		return (
			<Field key={name} component={ObjectivesFieldTextArea} type="textarea" label={label} name={name} />
		)
	}

	renderFieldSelect({ label, name }) {
		return (
			<Field key={name} component={ObjectivesFieldSelect} type="select" label={label} name={name} >
				<option />
				<option value="1">Annual Objectives</option>
				<option value="2">Customer Driven</option>
				<option value="3">Innovation Obsessed</option>
			</Field>
		)
	}

	getTargetDate({ addDays = 90 }) {
		var date = new Date(); // Now
		date.setDate(date.getDate() + addDays); // Set now + 30 days as the new date
		return date.toLocaleDateString();
	}

	renderObjectivesForm() {
		const { handleSubmit, pristine, reset, submitting } = this.props

		return (
			<div>
				<div>
					<form onSubmit={this.props.handleSubmit(values => this.onKRASubmit(values))}>
						<p><span className="display-4">Create Objective</span></p>
						<p>Describe your objective with more details</p>
						{this.renderFieldSelect({ label: 'Category', name: 'categoryId' })}

						{this.renderField({ label: 'Title', name: 'title' })}
						{this.renderFieldTextArea({ label: 'Objective', name: 'objective' })}
						<div>
							<p>Target completion: {this.getTargetDate({ addDays: 90 })} </p>
						</div>
						<div>
							<Link to="/" variant="flat" size="xxl" className="btn-secondary rounded-pill px-4 mr-3 float-left" role="button">
								Cancel
						</Link>
							<Button type="submit" className="rounded-pill px-4 mr-3 float-right" variant="flat" size="xxl" disabled={submitting}>
								Submit
						</Button>
							{this.showToastr()}
						</div>
					</form>
				</div>
			</div>
		)
	}

	render() {
		if (!this.props.loggedUser) {
			return null;
		}

		return (
			<div className="container objectivesForm">
				{this.renderObjectivesForm()}
			</div>
		);
	}
}

const mapStoP = state => {
	return {
		loggedUser: state.loggedUser,
		kra: state.objectivesReducer,
		reviewUserByIdList: state.reviewUserByIdList,
		objectivesParams: state.form
	};
};

// For the redux for validation:
const doFormValidate = (values) => {
	const errors = {};
	const fieldNames = ['categoryId', 'quarterlyCycle', 'title', 'objective'];

	_.each(fieldNames, (fieldName) => {
		if (!values[fieldName])
			errors[fieldName] = "You must provide a value";
	});

	return errors;
}

export default reduxForm({
	validate: doFormValidate,
	form: 'objectivesForm',
	destroyOnUnmount: false,
	enableReinitialize: true,
})(connect(mapStoP, actions)(ObjectivesForm));
