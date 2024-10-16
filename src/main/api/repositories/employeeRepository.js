const employeeModel = require('../models/employeeModel')
const logger = require('../../config/winston')

const employeeRepository = {
    getEmployeeById: async (id) => {
        try {
            const result = await employeeModel.findOne({id})
            return result;

        } catch (error) {
            logger.error(`employeeRepository :: getEmployeeById :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },
    existsByEmployeeId: async (id)=> {
        try {
            const result = await employeeModel.findOne({id})
            if (result) {
                return true;
            }
        } catch (error) {
            logger.error(`employeeRepository :: existsByEmployeeId :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },

    createEmployee: async (id,name,email,mobileNo,designation,experience) => {
        try {
            const newEmployee = new employeeModel({ id,name,email,mobileNo,designation,experience });
            await newEmployee.save();
            return newEmployee;
        } catch (error) {
            logger.error(`employeeRepository :: createEmployee :: ${error.message} :: ${error}`);
            throw new Error(`Error creating employee: ${error.message}`);
        }
    },updateEmployee: async (id, updatedData) => {
        try {
            const result = await employeeModel.findOneAndUpdate({ id }, updatedData, { new: true });
            return result;
        } catch (error) {
            logger.error(`employeeRepository :: updateEmployee :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },
};

module.exports = employeeRepository;
