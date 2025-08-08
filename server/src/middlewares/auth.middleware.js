import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        console.log("No token found in cookies");
        return res.status(400).json({message:"session expired.!"});
    }

    try {
        console.log("Token found, verifying...");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(verified){
            console.log("Token verified successfully for user:", verified._id);
            req.user = {_id:verified._id}; // Attach user Id to request
            next();
        }
    } catch (error) {
        console.log("Token verification failed:", error.message);
        res.status(403).json({ error: "Invalid token", details: error.message });
    }
};

export default authenticateUser;
