const cards = require('../models/cardsModel');
const wrkSpace=require('./../models/wrkSpaceModel');
const tasks=require('../models/taskModels');
const User=require('../models/userModel');

exports.createWrkSpace = async (req,res,next) => {
  const {wrkSpaceName}=req.body;
    const newWrkSpace=await wrkSpace.create({
        name:wrkSpaceName,
        cards:[]
    });

    res.status(201).json({
        status: 'success',
        data: {
          workspace: newWrkSpace,
        },
      });
};

exports.createCard = async (req,res,next) => {
    const {cardName,wrkSpaceId} = req.body;
    const newCard = await cards.create({
        name:cardName,
        list:[],
        workSpace:wrkSpaceId
    });
    const cardId=newCard._id;
    const newWorkSpace=await wrkSpace.findById(wrkSpaceId);
     console.log(newWorkSpace);
     newWorkSpace.cards.push(cardId);
     await newWorkSpace.save();

     res.status(201).json({
        status: 'success',
        data: {
          workSpace: newWorkSpace,
        },
        card: newCard
      });
};

exports.createTask = async (req,res,next) => {
  const {task,cardId} = req.body;
  const newTask = await tasks.create({
      name: task,
      cards: cardId
  });
  const taskId=newTask._id;
  const newCard=await cards.findById(cardId);
   console.log(newCard);
   newCard.list.push(taskId);
   await newCard.save();

   res.status(201).json({
      status: 'success',
      data: {
        card: newCard,
      },
    });
};

exports.addWrkSpace=async(req,res,next)=>{
  try {
    const userUpdate = await User.findByIdAndUpdate(req.body.userId, {$push : {wrkSpaces: req.body.wrkSpaceId}}, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        userUpdate,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getWrkSpace = async (req,res)=>{
  try {
    const SinglewrkSpace = await wrkSpace.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        SinglewrkSpace,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCard = async (req,res)=>{
  try {
    const SingleCard = await cards.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        SingleCard,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// exports.addCards=async(req,res,next)=>{
//      const {wrkSpaceId,cardId} = req.body;
//      const newWorkSpace=await wrkSpace.findById(wrkSpaceId);
//      console.log(newWorkSpace);
//      newWorkSpace.cards.push(cardId);
//      await newWorkSpace.save();
//      res.status(201).json({
//         status: 'success',
//         data: {
//           workSpace: newWorkSpace,
//         },
//       });
// };