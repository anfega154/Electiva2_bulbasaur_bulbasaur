const express = require('express')
const app = express();
const cors=require("cors")
require('dotenv').config();
const routerUser = require('../v1/User/Routers/UserRouters');
const authRouter = require('../v1/Auth/Routers/ApiRouters')
const i18n = require('../Utils/helpers/i18n');


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(i18n.init);

app.use("/api",authRouter)
app.use("/api",routerUser)


const PORT = process.env.PORT || 3700;
app.listen(PORT, (req, res) => {
  console.log("server in  http://localHost:" + PORT);
});


module.exports = app;