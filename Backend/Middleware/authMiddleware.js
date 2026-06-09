import jwt from 'jsonwebtoken';

export const authMiddleware=(req,res,next)=>{
  try{
    const token=req.cookies.ltkn;
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Authentication required",
      });
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    console.log("DECODED TOKEN:", decoded);
    req.user=decoded;
    next();

  }
  catch(err){
     return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }
}