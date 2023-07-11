const mongoose = require('mongoose');
const Joi = require('joi')

const taskSchema = new mongoose.Schema({
    name: String,
    description:String,
}, { timestamps: true });

const Task = mongoose.model('task',taskSchema);

function validateTask(task){
    const schema = Joi.object({
        name:Joi.string().min(3).max(60).required().messages({
            'string.min':'Name must be at least 3 characters',
            'any.required':'Name is required',
            'string.max':'Maximum length allowed is 60 characters'
        }),
        description:Joi.string().max(3000).messages({
            'string.max':'Maximum length allowed is 3000 characters'
        }),
    });
    return schema.validate(task);
}

module.exports = {Task,validateTask};