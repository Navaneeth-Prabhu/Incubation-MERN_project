const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./Routes/AuthRoutes")
const cookieParser = require("cookie-parser")
const AdminRoute = require('../server/Routes/AdminRoutes')
const app = express();

app.listen(3001, ()=>{
console.log("server started");
})

mongoose.connect("mongodb://localhost:27017/incubation",{
    useNewUrlParser:true,useUnifiedTopology:true,
}).then(()=>{
    console.log("db connected successfully");
}).catch(err=>{
    console.log(err.message)
})

app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST","PATCH","PUT"],
    credentials:true,
}))
app.use(cookieParser())
app.use(express.json())
app.use("/",authRoutes)
app.use('/admin',AdminRoute)