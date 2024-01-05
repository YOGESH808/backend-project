require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const authRouter = require('./routes/authRoutes');
const notesRouter = require('./routes/notesRoutes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const limiter = rateLimit(
    {
        windowMs:  15 * 60 * 1000, 
        limit: 100, 
        message:"Rate Limit Exceeded, try after 15 minutes"
    }
);

app.use(limiter);
app.use(cors());

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
module.exports = app;