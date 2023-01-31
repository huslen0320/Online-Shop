const port = 8000;
const express = require('express');
const cors = require('cors');
const app = express();

const menuRouter = require("./routers/menu.route.js");
const cateRouter = require("./routers/category.route.js");


app.use(cors());
app.use(express.json());

app.use("/api", menuRouter);
app.use("/api", cateRouter);



app.get("/api", (req, res) => {
    res.json({ message: "Welcome Rest API" });
});

app.listen(port, () => console.log("server is running"));