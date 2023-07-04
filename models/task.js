const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: String,
    discription:String,
    date:{type:Date,default:Date.now},
}, { timestamps: true });

const Task = mongoose.model('task',taskSchema);


module.exports = Task;