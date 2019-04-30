const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    Company: {
         type: String,
         required: true
    },
    Profile: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    Salary: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
  
},
{
    timestamps: true
}
)

jobSchema.index({location: '2dsphere'})
module.exports = mongoose.model('jobs', jobSchema);
