import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import UserProfile from "./UserProfile";
import Objectives from "./objectives/Objectives";
import GoalsDashboard from "./GoalsDashboard";
import { Container, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import ObjectivesForm from "./objectives/ObjectivesForm";
import UsersDashboard from "./UsersDashboard";

import 'bootstrap/dist/css/bootstrap.css';
import "../styles.css";

//reducers: - In Root file
//store: - In Root file
//action creator - expect to return a function for reduxThunk

class App extends Component {

	componentDidMount() {
		this.props.fetchUser();
	}

	renderBanner() {
		return (<header className="masthead">
			<div className="container h-100">
				<div className="row h-100 align-items-center">
					<div className="col-12 text-center">
						<h1 className="font-weight-light">Welcome to the GOALMAN</h1>
						<p className="lead">Appraisal App</p>
					</div>
				</div>
			</div>
		</header>)
	}

	render() {
		return (
			<Router>
				<div className="App goalman lead">
					<Container>
						<Row>
							<Col sm={3} className="bg-light"><UserProfile /></Col>
							<Col sm={9}>
								<Switch>
									{/* We can use HOC for autherizing the login and rendering the component */}
									<Route path="/home" exact children={this.props.loggedUser
										? this.renderBanner()
										: ("Please login to see the objectives")
									} />

									<Route path="/mygoals" exact children={this.props.loggedUser
										? <GoalsDashboard />
										: ("Please login to see the objectives")
									} />

									<Route path="/reviews" exact children={this.props.loggedUser
										? <UsersDashboard />
										: ("Please login to see the objectives")
									} />

									<Route path="/review/:id" exact children={this.props.loggedUser
										? <GoalsDashboard />
										: ("Please login to see the objectives")
									} />

									<Route path="/objectives/:id" exact children={this.props.loggedUser
										? <Objectives />
										: ("Please login to see the objectives")
									} />

									<Route path="/objectives" exact children={this.props.loggedUser
										? withRouter(ObjectivesForm)
										: ("Please login to see the objectives")
									} />
								</Switch>
							</Col>
						</Row>
					</Container>
				</div>
			</Router>
		);
	}
}

const mapStoP = state => {
	return {
		loggedUser: state.loggedUser
	};
};

export default connect(
	mapStoP,
	actions
)(App);
