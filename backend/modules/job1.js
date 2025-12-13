import mongoose from "mongoose";

const job1Schema = new mongoose.Schema({
    jobID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
    },

    phoneNumber: {
        type: String,
        required: true
    },

    jobDate: {
        type: Date,
        default: Date.now
    },

    needDate: {
        type: Date,
        default: Date.now
    },

    items: [
        {
            type: {
                type: String,
                enum: ["tute", "cover", "other"],
                required: true,
            },
            data: {
                type: Object,
                required: true,
            },
            status: {
                type: String,
                default: "Pending"
            }
        }
    ],
});

const Job1 = mongoose.model("job1", job1Schema);
export default Job1;
