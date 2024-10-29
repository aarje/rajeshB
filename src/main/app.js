const express = require('express');
const mongoose = require('mongoose');
const setupSwagger = require('./config/swagger');

const employeeRouter = require('./api/routes/employeeRouts');


const app = express();
const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/', {
    dbName:"newone"
})
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(() => console.error("Error connecting to MongoDB:"));

app.use(express.json());
setupSwagger(app);
app.use("/api/v1/employee", employeeRouter);



app.all("*",(req,res,next)=>{
    res.status(404).json({error:"Api not Found"})
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UUID of the employee
 *         name:
 *           type: string
 *           description: Name of the employee
 *         email:
 *           type: string
 *           description: Email of the employee
 *         mobileNo:
 *           type: string
 *           description: Mobile number of the employee
 *         designation:
 *           type: string
 *           description: Employee's designation
 *         experience:
 *           type: number
 *           description: Work experience in years
 *         status:
 *           type: integer
 *           enum: [0, 1, 2]
 *           description: 0 = deleted, 1 = active, 2 = deactive
 */
