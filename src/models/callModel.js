const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const callSchema = new Schema({
    id: ObjectId,
    contactname: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ['none', 'prospecting', 'administrative', 'negotiation', 'demo', 'project', 'desk']
    },
    relatedTo: {
        type: String,
        enum: ['account', 'deal', 'campaign']
    },
    type: {
        type: String,
        enum: ['outbound', 'inbound', 'missed']
    },
    details: {
        type: String,
        enum: ['CURRENT_CALL', 'COMPLETED_CALL', 'SCHEDULED_CALL']
    },
    dateTime: {
        type: Date
    },
    duration: {
        type: String
    },
    description: {
        type: String
    },
    result: {
        type: String,
        enum: ['none', 'interested', 'not_interested', 'no_response_or_busy', 'requested_more_info', 'requested_call_back', 'invalid_number']
    }
});

const callModel = mongoose.model('call', callSchema);

module.exports = callModel;