import jwt from 'jsonwebtoken';
import UserModel from '../models/usermodel.js';

const verifytoken =async(req, res, next) => {
    
    try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
        // console.log(token);
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }
        // console.log(req.cookies.token)
        const decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);
        
         const user= await UserModel.findById(decoded._id);

         if (!user) {
            
            return res.status(401).json({
                msg:"invalid user"
            })
        }
         req.user =user
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send('Unauthorized: Invalid token');
    }
};

export default verifytoken;
