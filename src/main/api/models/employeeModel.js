const mongoose = require('mongoose');
const bcrypt=require("bcryptjs")
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,  lowercase: true,    },
    mobileNo: { type: String, required: true },
    designation: { type: String, required: true },
    experience: { type: Number, default: 0 },
    status: { 
        type: Number, 
        enum: [0, 1, 2],  // 0 = Deleted, 1 = Active, 2 = Deactivated
        default: 1
    }
});


const employeeModel = mongoose.models.employee ||  mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;
