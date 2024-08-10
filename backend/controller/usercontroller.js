import UserModel from '../models/usermodel.js';
import bcrypt from 'bcrypt';
// import uploadoncloudinary from '../util/cloudinary.js';
import jwt from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';
// import { v2 as cloudinary } from 'cloudinary';



// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET // Hardcoded for now, ensure to secure this in production
// });
const registerUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  // Basic validation
  if (!username || !fullname || !password || !email) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username,
      fullname,
      email,
      password: newPassword
    });

    await user.save();
    res.send(user);
    console.log(email, password, fullname);
  } catch (err) {
    res.status(500).send('Error registering user');
    console.error(err);
  }
};

const Loginuser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation


  try {
    if (!email || !password) {
      return res.status(400).send('All fields are required');
    }
    const user = await UserModel.findOne({ email }).populate("post");

    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SCERET_KEY, { expiresIn: "1d" });


    res.status(200).cookie('accesstoken', token, {
      // 15 minutes
      httpOnly: true, // make the cookie visible in the browser
      secure: process.env.NODE_ENV === 'production', // Only set to true in production
      sameSite: 'none'  // set the same-site flag
    }).send(user);

    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }


  } catch (err) {
    res.status(500).send('Error logging in user');
    console.error(err);
  }
};

const profileimage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // res.status(200).send(req.file.path);

   
    const user = await UserModel.findByIdAndUpdate(req.user._id, {
      $set: {
        avatar:req.file.path
      }

    })
    await user.save()


    console.log(req.user._id);
    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send('Error uploading avatar');
    console.error(err);
  }
};


const userpost = async (req, res) => {
  const user = await usermodel.findById(req.user._id).populate("post").select("-password ")

  return res.send(user)

}

const logoutuser = (req, res) => {
  console.log('Logout request received');

  res.status(200).clearCookie('accesstoken', {
    httpOnly: true, // make the cookie visible in the browser
    secure: true, // Only set to true in production
    sameSite: 'none'
  })
    .json({ message: 'Logged out successfully' });

};




export { registerUser, Loginuser, profileimage, userpost, logoutuser };
