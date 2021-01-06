const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
require("./routes/userRoutes")(app);
require("./routes/objectivesRoutes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server started at port:", PORT);
});