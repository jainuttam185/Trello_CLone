const mongoose=require('mongoose');
const validator=require('validator');

const tasksSchema = new mongoose.Schema({
    name:String,
    cards:{
        type: mongoose.Types.ObjectId,
        ref: 'cards',
    },
});

const tasks = mongoose.model('lists',tasksSchema);

module.exports=tasks;

