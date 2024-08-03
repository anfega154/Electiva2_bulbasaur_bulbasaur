const express = require('express')
const app = express();
const cors=require("cors")
require('dotenv').config();
const routerUser = require('../../app/Routers/v1/apiRouters');


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api",routerUser)


const PORT = process.env.PORT || 3700;
app.listen(PORT, (req, res) => {
  console.log("server in  http://localHost:" + PORT);
});


module.exports = app;