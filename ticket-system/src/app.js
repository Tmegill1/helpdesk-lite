const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/tickets", require("./routes/tickets.routes"));
app.use("/assets", require("./routes/assets.routes"));
app.use("/reports", require("./routes/reports.routes"));

app.use(require("./middleware/errorHandler"));

module.exports = app;
