const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const activitySchema = new Schema({
    id: ObjectId,
    Subject: {
        type: String,
        required: true
    },
    type: {
        type: String, enum: ['TASK', 'MEETING', 'CALL'],
        required: true
    },
    taskid: { type: ObjectId },
    meetingid: { type: ObjectId },
    callid: { type: ObjectId },
    from: { type: Date, required: true },
    dueDate: { type: Date },
    priority: {
        type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT']
    },
    contact: { type: ObjectId },
    owner: { type: ObjectId, required: true },
    status: { type: String, enum: ['OPEN', 'CLOSED'] }
});


const activityModel = mongoose.model('activity', activitySchema);

module.exports = activityModel;