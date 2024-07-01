const User=require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const crypto=require('crypto');

const signToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
     expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken=(user,statusCode,res)=>{
  const token=signToken(user._id);
  const cookieOptions={
    expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
    httpOnly:true
  };

  res.cookie('jwt',token,cookieOptions);
  user.password=undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data:{
      user
    }
  });
};

exports.signup = async (req,res,next) => {
  console.log("signup")
     const newUser = await User.create(req.body);
     createSendToken(newUser,201,res);
};

exports.login =async (req,res,next)=>{
  const {email,password}=req.body;
   if(!email || !password){
    res.status(400).json({status:'fail',message:'Please provide email and password'});
   }

   const user =await User.findOne({email}).select('+password');
   if(!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({status:'fail',message:'Incorrect email or password'});
  }
  createSendToken(user,200,res);
};

exports.refresh=async(req,res,next)=>{
  let token;
  if (
    // req.headers.authorization &&
    // req.headers.authorization.startsWith('Bearer')
    req.cookies.jwt
  ) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(400).json({status:'fail',message:"You are not logged in! Please log in to get access"});
  }
  //2)Verification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decoded.id);
  res.status(200).json({
    status: 'success',
    data: {
     token,
     user:freshUser
    },
  });
  next();
};

exports.logout = async(req,res)=>{
   res.cookie('jwt','loggedout',{
    expires:new Date(Date.now() + 1*1000),
    httpOnly:true
   });
   res.status(200).json({status:'success'});
};

exports.forgotPassword = async (req, res, next) => {
  //1) Get User data by email
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return res.status(400).json({status:'fail',message:"There is no user with email address."});
  }
  //2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3)  Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/trello/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and
  passwordConfirm to ${resetURL}. If you didnt forgot your password ,please ignore this email`;
  
  try {
    console.log(user.email,message);
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token(valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save({validateBeforeSave:false});
    return res.status(400).json({status:'fail',message:"Try Again!"});
  }
};

exports.resetPassword = async (req, res, next) => {
  //1) get user based on the token
  const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log(hashedToken);
  const user=await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}});
  //2) if token has not expired ,and there is user,set the new password
  console.log(user);
  if(!user){
    return res.status(400).json({status:'fail',message:"Token is invalid or has expired"});
  }
  user.password=req.body.password;
  user.passwordConfirm=req.body.passwordConfirm;
  user.passwordResetToken=undefined;
  user.passwordResetExpires=undefined;
  await user.save();//we use .save instead of findOneandupdate as to run all the validators
  //3) Update changedPasswordAt property for the user
  //4) Log the user in ,send JWT
  createSendToken(user,200,res);
};