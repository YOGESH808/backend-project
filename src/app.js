require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const notesRouter = require('./routes/notesRoutes');
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connected to Database');
}).catch((error)=>{
    console.log(error);
})


app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api',notesRouter);


app.listen(PORT,()=>{
    console.log("Server is running on Port",PORT);
})