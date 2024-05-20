import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        reqiured: [true, 'company name is require'],

    },
    position: {
        type: String,
        reqiured: [true, 'job position is required'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['part-time', 'full-time', 'internship', 'contract'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: "tamilnadu",
        required: [true, 'work is required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})


export default mongoose.model('job', jobSchema);