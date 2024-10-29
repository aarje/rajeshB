const employeeRepository = require('../repositories/employeeRepository');
const logger = require('../../config/winston');
// const redisClient = require('../../config/redis')


const employeeService = {
    getEmployeeById: async (id) => {
        try {
            
            // const cachedEmployee = await redisClient.get(`employee:${id}`);
            // if (cachedEmployee) {
            // return JSON.parse(cachedEmployee);
            // }
                    
            const Employee = await employeeRepository.getEmployeeById(id);

            // await redisClient.set(`employee:${id}`, JSON.stringify(Employee));
            return Employee;
        } catch (error) {
            logger.error(`employeeService :: getEmployeeById :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },
    updateEmployee: async (id, updatedData) => {
        try {
            const updatedEmployee = await employeeRepository.updateEmployee(id, updatedData);
            // await redisClient.del(`employee:${id}`);
            return updatedEmployee;
        } catch (error) {
            logger.error(`employeeService :: updateEmployee :: ${error.message} :: ${error}`);
            throw new Error(error.message);
        }
    },

};

module.exports = employeeService;