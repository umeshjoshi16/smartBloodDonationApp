import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Model/userModel.js';

const registerUser=async(req,res)=>{
 
  try{
     const{role,email,password,phoneNumber,province,district,city,streetAddress,
   //donor specific
   donorName,dateOfBirth,gender,bloodGroup,
   //hospital specific
   hospitalName,
   //organzation specific
   organizationName,organizationType,

   registrationNumber, contactPerson,contactPersonNumber


  }=req.body

  const existingUser=await User.findOne({email});
  if(existingUser){
    return res.status(400).json({
      message:"User already exists",
      success:false,

    });
  };


  const hashedPassword=await bcrypt.hash(password,10);

  const userData={
    role,email,password:hashedPassword,phoneNumber,province,district,city,streetAddress
  };
  if(role==='donor'){
    userData.donorName=donorName;
    userData.dateOfBirth=dateOfBirth;
    userData.gender=gender;
    userData.bloodGroup=bloodGroup;

  }
  else if(role==='hospital'){
    userData.hospitalName=hospitalName;
    userData.registrationNumber=registrationNumber;
     userData.contactPerson = contactPerson;
      userData.contactPersonNumber = contactPersonNumber;

  }
  else if (role === "organization") {
      userData.organizationName = organizationName;
      userData.organizationType = organizationType;
      userData.registrationNumber = registrationNumber;
      userData.contactPerson = contactPerson;
      userData.contactPersonNumber = contactPersonNumber;
    }
      console.log(userData);
      const user = await User.create(userData);
      res.status(201).json({
        message:"User registered sucessfully",
        success:true,
      });


  }
  catch(err){
    res.status(500).json({
      message:'Server error',
      error: err.message,
    });

  }
}

const loginUser=async(req,res)=>{
  try{
    const{email,password}=req.body;

    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message:"User doesn't exists",
        success:false,
      })
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({
        message:"Invalid credentials"
      })
    }

    const token=jwt.sign(
      {
        id:user._id,
        role:user.role,

      },
      process.env.JWT_SECRET,
      {
        expiresIn:"7d"
      }
    );

    res.cookie("ltkn",token,{
     httpOnly:true,
     secure:false,
     sameSite:"strict",
     maxAge:7*24*60*60*1000,

    });

    res.json({
      message:"Login sucessful",
      user:{
        id:user._id,
        role:user.role,
        email:user.email,

      },

    });


  }
  catch(err){
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
    
  }


}

const getProfile=async(req,res)=>{
  try{
    
   const user = await User.findById(req.user.id).select("-password");


    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found",

      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export {registerUser,loginUser,getProfile};