const axios = require("axios");
const CONSTANTS = require("../config/constants");

const dbHost = CONSTANTS.ENABLE_DB_MOCK ? CONSTANTS.DB_JSON_SERVER_HOST : CONSTANTS.DB_MONGO_HOST;

module.exports = (app) => {
    app.get("/api/objectives", async (req, res) => {

        console.log("/api/objectives req.query", req.query);

        // TODO: Need to see the user detail in express req, to be used in the session

        // TODO: Will be replaced with real DB call.
        const resp = await axios.get(`${dbHost}${req.url}`);

        res.send({
            objectivesResponse: resp.data
        });

        //TODO: Need to do error handling
    });


    app.post("/api/objectives", async (req, res) => {
        const { data } = req.body;
        const { values: { categoryId, quarterlyCycle, title, objective } } = data.params;
        const addedOn = new Date();
        const targetCompletion = new Date(new Date().setDate(new Date().getDate() + 90));
        const createParams = {
            title,
            categoryId,
            quarterlyCycle,
            objective,
            userId: data.userId,
            "addedOnDate": addedOn.toLocaleDateString(),
            "targetCompletionDate": targetCompletion.toLocaleDateString()
        }

        // TODO: Will be replaced with real DB call.
        const resp = await axios.post(`${dbHost}${req.url}`, createParams);

        if (resp.status === 201) {
            console.log(`KRA Created Successfully id: ${resp.data.id}`);

            res.send({
                objectivesResponse: resp.data
            });

            return;
        }

        console.log("KRA Creation - Something went wrong");
        console.log("create onKRASubmit params", createParams);

    });

    app.patch("/api/objectives/:id", async (req, res) => {
        const { data } = req.body;
        const { values: { quarterlyCheckIn, rating, feedback, quarterlyCycle } } = data.params;
        const reviewUpdated = new Date().toLocaleDateString();
        const updateParams = {
            id: data.objectiveId,
            managerReview: {
                quarterlyCheckIn,
                feedback,
                rating,
                quarterlyCycle,
                reviewUpdated
            }
        }

        // TODO: Will be replaced with real DB call.
        const resp = await axios.patch(`${dbHost}${req.url}`, updateParams);

        if (resp.status === 200) {
            console.log("KRA Update Successfully");

            res.send({
                objectivesResponse: resp.data
            });

            return;
        }

        console.log("onKRASubmit updateParams", updateParams);
        console.log("KRA Creation - Something went wrong");
    });
}