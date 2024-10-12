const express = require('express')
const app = express();
const cors=require("cors")
require('dotenv').config();
const routerUser = require('../v1/User/Routers/UserRouters');
const authRouter = require('../v1/Auth/Routers/ApiRouters')
const followRouter = require('../v1/Follow/Roters/FollowRouters')
const tweetRouter = require('../v1/Tweet/Routers/TweetRouters')
const i18n = require('../Utils/helpers/i18n');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clon X',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/v1/**/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(i18n.init);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api",authRouter)
app.use("/api",routerUser)
app.use("/api",followRouter)
app.use("/api",tweetRouter)





const PORT = process.env.PORT || 3700;
app.listen(PORT, (req, res) => {
  console.log("server in  http://localHost:" + PORT);
});


module.exports = app;