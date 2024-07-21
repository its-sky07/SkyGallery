import jwt from 'jsonwebtoken';
import UserModel from '../models/usermodel.js';

const verifytoken =async(req, res, next) => {
    
    try {
        const token = req.cookies?.accestoken 
        console.log(token);
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }
        // console.log(req.cookies.token)
        const decoded = jwt.verify(token, 'kY8h2fT7xvB3jW9nPm6zLqD5rA1sXoV4cUeNtHy2gJkZpM7vD');
        
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
