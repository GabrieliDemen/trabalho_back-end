const jwt = require("jsonwebtoken"); 
 
 const auth = (req,res,next)=>{
    try {
        const aut = req.headers.authorization;
        if(!aut) return res.status(401).json({message:"Not Authorized!"});
        const token = aut.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({message:"Not Authorized!"});
    }
 }

 module.exports=auth;