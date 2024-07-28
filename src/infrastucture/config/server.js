const express = require('express')
const app = express();
const cors=require("cors")
require('dotenv').config();


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{

    res.status(200).json({
      status: " success",
      mensaje: "Bienvenido"
    });
  })


const PORT = process.env.PORT || 3700;
app.listen(PORT, (req, res) => {
  console.log("server in  http://localHost:" + PORT);
});