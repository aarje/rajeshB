const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: {type: String,required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,  lowercase: true,    },
    mobileNo: { type: String, required: true },
    designation: { type: String, required: true },
    experience: { type: String }
});

const employeeModel = mongoose.models.employeeModel ||  mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;
