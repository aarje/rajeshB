const express = require('express');
const employeeController = require('../controllers/employeeController');


const employeeRouter = express.Router();

employeeRouter.get("/id/:id", employeeController.getEmployeeById);

employeeRouter.post('/create', employeeController.creaateEmployee );
employeeRouter.put('/id/:id', employeeController.updateEmployee );



module.exports = employeeRouter;