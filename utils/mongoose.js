const mongoose = require('mongoose');

let mongooseconnection = async function(){
    await mongoose.connect('mongodb+srv://mayank:mayank@crmjax.lcgxi.mongodb.net/crmjax?retryWrites=true&w=majority');
}

module.exports = mongooseconnection;