const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const rootRouter = require('./routes/index');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1', rootRouter);

app.listen(port, (req, res) => {
    console.log(`Backend running on port ${port}`);
});