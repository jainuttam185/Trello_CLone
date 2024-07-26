const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const morgan=require("morgan");
const userRouter=require('./routes/userRoutes');
const wrkSpaceRouter=require('./routes/wrkSpaceRoutes');
const cors=require('cors');

app.use(cors({credentials:true, origin: "https://uttamtrelloboard.netlify.app/"}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/workspace',wrkSpaceRouter);
app.use('/trello',userRouter);

module.exports = app;   
