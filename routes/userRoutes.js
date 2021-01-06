
const axios = require("axios");
const CONSTANTS = require("../config/constants");

const dbHost = CONSTANTS.ENABLE_DB_MOCK ? CONSTANTS.DB_JSON_SERVER_HOST : CONSTANTS.DB_MONGO_HOST;
const loggingUserId = CONSTANTS.ENABLE_USER_MOCK ? CONSTANTS.MOCK_USER_ID : "ssoLoggingUserId"; // TODO: Enable SSO 

module.exports = (app) => {
    app.get("/api/user", async (req, res) => {

        // TODO: Will be replace with DB call
        const resp = await axios.get(`${dbHost}${req.url}/${loggingUserId}`)

        req.user = resp.data;
        res.send({
            user: resp.data
        });

    });

    app.get("/api/user/all", async (req, res) => {

        // TODO: Will be replace with DB call
        const resp = await axios.get(`${dbHost}/api/user`);

        res.send({
            user: resp.data
        });

    });


    app.get("/api/user/:id", async (req, res) => {

        // const { userId } = req.query;
        // TODO: Will be replace with DB call
        const resp = await axios.get(`${dbHost}${req.url}`)

        req.user = resp.data;
        res.send({
            user: resp.data
        });

    });


    /**
     * User Profile details:
     * Endpoint - /api/user - http://localhost:5000/user/101
     * 
     * Objectives of the user:
     * Endpoint - /api/objectives - http://localhost:5000/user/101?_embed=objectives
     * 
     * /managerDashboard 
     * Endpoint - /api/usersList - http://localhost:5000/user?reportingMgrId=103
     * 
     */
};