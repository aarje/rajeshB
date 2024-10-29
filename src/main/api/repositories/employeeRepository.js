const employeeModel = require('../models/employeeModel');
const logger = require('../../config/winston');



const employeeRepository = {
    getEmployeeById: async (id) => {
        try {
            // const result = await employeeModel.findOne({id})
            const result = await employeeModel.findById(id)
            return result;

        } catch (error) {
            logger.error(`employeeRepository :: getEmployeeById :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },
    existsByEmployeeId: async (id)=> {
        try {
            const result = await employeeModel.findById(id)
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
            const newEmployee = new employeeModel({ id,name,email,mobileNo,designation,experience,status: 1 });
            await newEmployee.save();
            return newEmployee;
        } catch (error) {
            throw new Error(`Error creating employee: ${error.message}`);
        }
    },
    updateEmployee: async (id, updatedData) => {
        try {
            const result = await employeeModel.findByIdAndUpdate(id , updatedData, { new: true });
            return result;
        } catch (error) {
            logger.error(`employeeRepository :: updateEmployee :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },
    updateStatusById: async (id, status) => {
        try {
            console.log(id)
            console.log(status)
            const result = await employeeModel.findByIdAndUpdate( id , status , { new: true });
            return result;
        } catch (error) {
            logger.error(`employeeRepository :: updateStatusById :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },
    getAllEmployees: async () => {
        try {
            const employees = await employeeModel.find();
            return employees;
        } catch (error) {
            console.error(`employeeRepository :: getAllEmployees :: ${error.message}`);
            throw new Error(error.message);
        }
    },
};

module.exports = employeeRepository;
