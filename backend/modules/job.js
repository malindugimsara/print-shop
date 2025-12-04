import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobID : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
   
    email : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: String,
        required: true,
    },
    
    details : {
        type: String,
        required: true
    },
    needDate : {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    },
    images : {
        type: [String]
    }
    
})

const Job = mongoose.model("job", jobSchema);
export default Job;