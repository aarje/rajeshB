
const employeeService  = require('../services/employeeService');
const employeeRepository = require('../repositories/employeeRepository');
const errorCode = require('../../config/errorCodes');
const statusCode = require('../../config/statusCode');
const { logger } = require('../../config/winston');

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
            const {id, name, email ,mobileNo,designation,experience } = req.body;
            if (!id ||!name || !email || !mobileNo || !designation ) {
                return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee004);
            }
            const newEmployee = await employeeRepository.createEmployee(id,name,email,mobileNo,designation,experience);
            
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
            const id = req.params.id;
            const updatedData = req.body;
    
            if (!id) {
            return res.status(statusCode.status.BAD_REQUEST).send(errorCode.employee003);
            }
            const employeeExists = await employeeRepository.existsByEmployeeId(id);
            if (!employeeExists) {
            return res.status(statusCode.NOT_FOUND).send(errorCode.employee002);
            }
            const updatedEmployee = await employeeService.updateEmployee(id, updatedData);
            return res.status(statusCode.status.OK).send({
            data: updatedEmployee,
            message: 'Employee updated successfully',
        })
        } catch (error) {
        logger.error(`employeeController :: updateEmployee :: ${error.message} :: ${error}`);
        return res.status(statusCode.status.INTERNAL_SERVER_ERROR).send(errorCode.employee001);
    }
}
}

module.exports = employeeController;