import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Col, Row } from "react-bootstrap";
import { Link, Redirect, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getUserById();
    }

    getUserById() {
        const { id: paramsId } = this.props.match.params;

        if (paramsId) {
            this.props.fetchUserById({ userId: paramsId });
        }
    }

    redirectToLandingPage() {
        const { path, isExact } = this.props.match;
        const { user: { name, role, empId, isReviewer } } = this.props.loggedUser;
        const isRedirectToLandingPage = (isExact);

        return (
            !isReviewer
                ? <li className="list-group-item bg-light" >
                    {(isRedirectToLandingPage)
                        ? <Redirect to="/mygoals" />
                        : <NavLink class="active" to="/mygoals">My Goals</NavLink>}
                </li>
                : <li className="list-group-item bg-light">
                    {(isRedirectToLandingPage)
                        ? <Redirect to="/reviews" />
                        : <NavLink activeClassName="setActive" to="/reviews">Reviews</NavLink>}
                </li>
        )
    }

    render() {
        if (!this.props.loggedUser || !this.props.loggedUser.user) {
            return null;
        }

        const { reviewUserByIdList } = this.props;
        const { user: { name, role, empId, isReviewer } } = this.props.loggedUser;

        return (
            <div className="userDetails bg-light">
                <div className="logo">
                    <h1 className="display-4">
                        <Link to={!isReviewer ? "/mygoals" : "/reviews"}>GoalMan</Link></h1>
                </div>
                <br />
                {(reviewUserByIdList) ? (<div>
                    <Row className="row-fluid">
                        <Col className="h6">{reviewUserByIdList.user.name}</Col>
                    </Row>
                    <Row className="row-fluid">
                        <Col className="h6">{reviewUserByIdList.user.empId} / {reviewUserByIdList.user.role}</Col>
                    </Row>
                </div>) : null}
                <br />
                <nav className="menu">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-light">
                            <NavLink to="/home">Home</NavLink>
                        </li>
                        {this.redirectToLandingPage()}
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStoP = state => {
    return {
        loggedUser: state.loggedUser,
        reviewUserByIdList: state.reviewUserByIdList
    };
};

UserProfile = connect(mapStoP, actions)(UserProfile);

export default withRouter(UserProfile);
