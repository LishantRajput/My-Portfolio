const express = require("express")
const dbconnection = require("./conection");
const cors = require('cors')

require("dotenv").config()
const app = express()
app.use(cors({
  origin: [
    "https://lishantrajput.netlify.app",
    "http://localhost:5173/"
  ]
}));
app.use(express.json())
dbconnection()
app.get("/",(req, res)=>res.send("wellcome"))
app.use("/api/v1.0/portfolio/auth",require("./router/user.router"))
app.use("/api/v1.0/portfolio/auth",require("./router/add.project.router"))
app.use("/api/v1.0/portfolio/",require("./router/render.project"))


app.listen(2005,()=>console.log("server run on port http://localhost:2005")) 

