const employeeService  = require('../services/employeeService');
const employeeRepository = require('../repositories/employeeRepository');
const errorCode = require('../../config/errorCodes');
const statusCode = require('../../config/statusCode');
const { logger } = require('../../config/winston');
const employeeValidation = require('../validation/employeeValidation');
const { v4: uuidv4 } = require('uuid');

const employeeController = {


    getEmployeeById: async (req, res) => {
        try {
            
            const id = req.params.id;
            
            if (!id) return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee003);

            const employeeExists = await employeeRepository.existsByEmployeeId(id)
            
            if (!employeeExists) return res.status(statusCode.status.NOT_FOUND).send(errorCode.employee002);
            const employee = await employeeService.getEmployeeById(id);

            return res.status(statusCode.status.OK).send({
                data: employee,
                message: "employee Fetched Successfully",
            });

        } catch (error) {
            console.log(error);
            logger.error(`employeeController :: getEmployeeById :: ${error.message} :: ${error}`);
            return res.status(statusCode.status.INTERNAL_SERVER_ERROR).send(errorCode.employee001);
        }
},

    creaateEmployee: async (req, res) => {
        try {
            const { error, value } = employeeValidation.validateCreateEmployee(req.body);
            if (error) {
                return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee001);
            }
            const { name, email ,mobileNo,designation,experience,status } = value;
            if (!name || !email || !mobileNo || !designation ) {
                return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee004);
            }
            const id = uuidv4();
            const newEmployee = await employeeRepository.createEmployee(id,name,email,mobileNo,designation,experience,status);
            
            return res.status(statusCode.status.OK).send({
                data: newEmployee,
                message: "Employee Created Successfully",
            });
        } catch (error) {
            
            logger.error(`employeeController :: createEmployee :: ${error.message} :: ${error}`);
            res.status(statusCode.status.INTERNAL_SERVER_ERROR);
        }
    },
    updateEmployee: async (req, res) => {
        try {
            const { error, value } = employeeValidation.validateUpdateEmployee(req.body);
            if (error) {
                return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee001);
            }
            
            const id = req.params.id;
    
            if (!id) {
            return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee003);
            }
            const employeeExists = await employeeRepository.existsByEmployeeId(id);
            if (!employeeExists) {
            return res.status(statusCode.status.NOT_FOUND).send(errorCode.employee002);
            }
            const updatedEmployee = await employeeService.updateEmployee(id, value);
            console.log(updatedEmployee);
            return res.status(statusCode.status.OK).send({
            data: updatedEmployee,
            message: 'Employee updated successfully',
        })
        } catch (error) {
        // logger.error(`employeeController :: updateEmployee :: ${error.message} :: ${error}`);
        return res.status(statusCode.status.INTERNAL_SERVER_ERROR).send(errorCode.employee001);
    }
    },
    updateStatusById: async (req, res) => {
        try {
            const { error, value } = employeeValidation.validateUpdateStatus(req.body);
            if (error) {
                return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee001);
            }
            const id = req.params.id;
            const status = value;
            if (!id || status === undefined) return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee004);
            const employeeExists = await employeeRepository.existsByEmployeeId(id);
            if (!employeeExists) return res.status(statusCode.status.NOT_FOUND).send(errorCode.employee002);
            console.log(employeeExists)

            const updatedEmployee = await employeeRepository.updateStatusById(id, status);
            console.log(updatedEmployee);

            return res.status(statusCode.status.OK).send({
                data: updatedEmployee,
                message: "Employee Status Updated Successfully",
            });
        } catch (error) {
            // logger.error(`employeeController :: updateStatusById :: ${error.message} :: ${error}`);
            return res.status(statusCode.status.INTERNAL_SERVER_ERROR).send(errorCode.employee001);
        }
    },
    getAllEmployees: async (req, res) => {
        try {
            const employees = await employeeRepository.getAllEmployees();
            return res.status(statusCode.status.OK).send({
            data: employees,
            message: "Employees Fetched Successfully",
            });
        } catch (error) {
            console.error(`employeeController :: getAllEmployees :: ${error.message}`);
            return res.status(statusCode.status.INTERNAL_SERVER_ERROR).send(errorCode.employee001);
        }
    },
}


module.exports = employeeController;