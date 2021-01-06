import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions";
import { ObjectivesFieldSelect, ObjectivesFieldTextArea } from "./objectives/objectivesField";
import _ from "lodash";
import { withRouter } from "react-router-dom";

class ManagerReviewForm extends Component {
    constructor(props) {
        super(props);
    }

    onKRASubmit() {
        if (this.props.loggedUser) {
            const { loggedUser: { user: { id: userId } }, history, managerReviewParams: { managerReviewForm }, objectiveId } = this.props;

            const { reviewUserByIdList: { user: { id: reviewUserId } } } = this.props;

            this.props.updateKra({ params: managerReviewForm, objectiveId, history, reviewUserId });
        }
    }

    renderFieldSelectquarterlyCheckIn({ label, name }) {
        return (
            <Field key={name} component={ObjectivesFieldSelect} type="select" label={label} name={name} horizontal={true}>
                <option />
                <option value="Needs Improvement">Needs Improvement</option>
                <option value="OK">OK</option>
            </Field>
        )
    }

    renderFieldSelectRating({ label, name }) {
        return (
            <Field key={name} component={ObjectivesFieldSelect} type="select" label={label} name={name} horizontal={true} >
                <option />
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </Field>
        )
    }

    renderFieldTextArea({ label, name }) {
        return (
            <Field key={name} component={ObjectivesFieldTextArea} type="textarea" label={label} name={name} />
        )
    }

    renderFieldSelectReviewCycle({ label, name }) {
        return (
            <Field key={name} component={ObjectivesFieldSelect} type="select" label={label} name={name} horizontal={true} >
                <option />
                <option value="Q1">Quarter-1</option>
                <option value="Q2">Quarter-2</option>
                <option value="Q3">Quarter-3</option>
                <option value="Q4">Quarter-4</option>
            </Field>
        )
    }


    render() {
        return (
            <div className="managerReviewForm ">
                <form onSubmit={this.props.handleSubmit(values => this.onKRASubmit(values))}>
                    <h1 className="h3">Manager Review Comments</h1>
                    {this.renderFieldSelectReviewCycle({ label: 'Quarterly Cycle', name: 'quarterlyCycle' })}
                    {this.renderFieldSelectquarterlyCheckIn({ label: 'Quarterly CheckIn:', name: "quarterlyCheckIn" })}
                    {this.renderFieldSelectRating({ label: 'Manager Rating:', name: "rating" })}
                    {this.renderFieldTextArea({ label: 'Feedback:', name: "feedback" })}

                    <Button type="submit" className="rounded-pill px-4 mr-3 float-right" variant="flat" size="xxl">
                        Submit Review
                    </Button>
                </form>
            </div>
        );
    }
}

// initialValues - to pre fill the form <Field/> based on the form names.
const mapStoP = state => {
    return {
        loggedUser: state.loggedUser,
        managerReviewParams: state.form,
        reviewUserByIdList: state.reviewUserByIdList,   // For review user details
        initialValues: {
            ...state.objectivesReducer.objectivesResponse[0].managerReview
        }
    };
};

// To do redux form validation
const doFormValidate = (values) => {
    const errors = {};
    const fieldNames = ['quarterlyCycle', 'quarterlyCheckIn', 'rating', 'feedback'];

    _.each(fieldNames, (fieldName) => {
        if (!values[fieldName])
            errors[fieldName] = "You must provide a value";
    });
    return errors;
}

// Wrap with reduxForm for form controls
ManagerReviewForm = reduxForm({
    validate: doFormValidate,
    form: 'managerReviewForm',
    destroyOnUnmount: false,
    enableReinitialize: true,
})(ManagerReviewForm);

// Wrap with redux connect to get the store value
ManagerReviewForm = connect(mapStoP, actions)(ManagerReviewForm)

export default withRouter(ManagerReviewForm);
