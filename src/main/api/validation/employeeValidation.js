const Joi = require('joi');

const createEmployeeSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    mobileNo: Joi.string().pattern(/^[0-9]{10}$/).required(),
    designation: Joi.string().required(),
    experience: Joi.number().integer().min(0).default(0), 
    status: Joi.number().valid(0, 1, 2).default(1) 
});


const updateStatusSchema = Joi.object({
    status: Joi.number().valid(0, 1, 2).required() 
});


const updateEmployeeSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    mobileNo: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    designation: Joi.string().optional(),
    experience: Joi.number().integer().min(0).default(0).optional(),
    status: Joi.number().valid(0, 1, 2).default(1).optional()
}).min(1);


module.exports = {
    validateCreateEmployee: (data) => createEmployeeSchema.validate(data),
    validateUpdateStatus: (data) => updateStatusSchema.validate(data),
    validateUpdateEmployee: (data) => updateEmployeeSchema.validate(data)
};
