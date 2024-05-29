const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const port =process.env.PORT ||3000

const getAllTours = (req, res) =>{
    res.status(200).json({data:{
        tours
    }})
}

app.get('/api/tours', getAllTours)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});