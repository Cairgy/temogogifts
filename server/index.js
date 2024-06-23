require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const router = require("./routes");
app.use("/api",router);

const port = process.env.PORT || 3000;

const startServer = async () => {
    await connectToMongoDB();
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server is listening on http://0.0.0.0:${port}`);
    });
};
startServer();