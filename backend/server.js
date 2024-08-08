// Import necessary modules
import express from 'express'
import mongoose from 'mongoose'
// import bodyParser from 'body-parser';
import userroute from './routes/userroute.js'
import postroute from './routes/postroute.js'
import commentroute from './routes/commentroute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Allpost } from './controller/postcontroller.js'
import verifytoken from './middleware/Auth.js'
import usermodel from './models/usermodel.js'
import  dotenv     from 'dotenv'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(cors({
  origin: 'https://theskygallery.netlify.app', // Don't use wildcard '*' instead specify frontend url
  credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


// Middleware to parse JSON


app.use("/user", userroute)
app.use("/posts",postroute)
app.use("/comments",commentroute)
app.get('/auth/user',verifytoken,async(req,res)=>{
const user= await usermodel.findById(req.user._id)
res.status(200).json(user)


} )

app.get('/', (req, res) => {
  res.send('hello from backend')
})
app.get("/posts",Allpost)




// MongoDB connection URLmongodb+srv://akashdinanathyadav
const mongoURI = process.env.MOMGOBD_URI;

// Connect to MongoDB


mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
// Start the server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
