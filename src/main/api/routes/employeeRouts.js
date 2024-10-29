const express = require('express');
const employeeController = require('../controllers/employeeController');


const employeeRouter = express.Router();

employeeRouter.get("/id/:id", employeeController.getEmployeeById);
employeeRouter.get("/all", employeeController.getAllEmployees);
employeeRouter.post('/create', employeeController.creaateEmployee );
employeeRouter.put('/id/:id', employeeController.updateEmployee );
employeeRouter.patch('/status/:id', employeeController.updateStatusById);



module.exports = employeeRouter;