import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      required:true
    },
    post:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    avatar:{
      type:String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
    
},{timestamps:true});

export default mongoose.model('User', userSchema);

