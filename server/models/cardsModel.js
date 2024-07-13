const mongoose=require('mongoose');

const cardsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Card must have a name'],
    },
    list:[{
        type: mongoose.Types.ObjectId,
        ref: 'lists',
    },
    ],
    workSpace:{
        type: mongoose.Types.ObjectId,
        ref: 'wrkSpace',
    }
});

cardsSchema.pre(/^find/,function(next){
    this.populate({path:'list',select:'-__v'});
    next();
 });

const cards = mongoose.model('cards',cardsSchema);

module.exports=cards;

