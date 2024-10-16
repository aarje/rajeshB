const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const employeeRouter = require('./api/routes/employeeRouts');


const app = express();
const PORT = 3000;
const redisUrl = 'redis://localhost:6379';

const redisClient = redis.createClient(redisUrl);
redisClient.on('connect' , ()=> {
    console.log("connected to redis...");
});
redisClient.on('error' , (error)=> {
    console.log("Redis error:",error);
});

mongoose.connect('mongodb://localhost:27017/', {
    dbName:"newone"
})
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(() => console.error("Error connecting to MongoDB:"));

app.use(express.json());
app.use("/api/v1/employee", employeeRouter);



app.all("*",(req,res,next)=>{
    res.status(404).json({error:"route is undefined"})
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
