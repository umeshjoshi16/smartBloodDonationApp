import mongoose from "mongoose";
import Emergency from "../Model/emergencyModel.js";
import User from "../Model/userModel.js";


export const putEmergencyRequest=async(req,res)=>{
  try{
    const{patientName,bloodGroup,unitsRequired,patientContact,urgency,reason,description}=req.body;

    if(!patientName||!bloodGroup||unitsRequired==null||!patientContact||!urgency||!reason||!description){
      return res.status(400).json({
        success:false,
        message:'All fields are required'
      })
    }

    const existingRequest=await Emergency.findOne({
      patientContact,
      status:"Active",
    });

    if(existingRequest){
      return res.status(409).json({
        success:false,
        message:"An active emergency request already exists."
      })
    }
  const user = await User.findById(req.user.id);

    const emergency=await Emergency.create({
      hospitalId:req.user.id,
      province: user.province,
      city: user.city,
      patientName,
      patientContact,
      bloodGroup,
      unitsRequired,
      urgency,
      reason,
      description,

    });

    return res.status(201).json({
      success:true,
      message:'Emergency request created sucessfully',
      emergency,

    });



  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:'Internal Server error'
    })

}}

export const getHospitalEmergencies=async(req,res)=>{
  try{
    const emergencies=await Emergency.find({
      hospitalId:req.user.id
    }).sort({createdAt:-1})
   return res.status(200).json({
    success:true,
    message:'Sucessfully  fetched emergency requests',
    emergencies,
   })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:'Internal server error',
    })

  }
}

export const getAvailableEmergencies=async(req,res)=>{
  try{
    
    const emergencies=await Emergency.find({
      status:'Active',
      province:req.user.province,
      city:req.user.city
    }).sort({ urgency: -1, createdAt: -1 });

     return res.status(200).json({
    success:true,
    message:'Sucessfully  fetched emergency requests',
    emergencies,
   })
  
  }
    catch(error){
    return res.status(500).json({
      success:false,
      message:'Internal server error',
    })

  }
}

export const cancelEmergencyRequest=async(req,res)=>{
  try{
    const{id,status}=req.body;
    console.log(status);
    console.log(id);

    
    await Emergency.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    return res.status(202).json({
      success:true,
      message:"Cancelled the request"
    })
    

  }
  catch(err){
       return res.status(500).json({
      success:false,
      message:'Internal Server error'
    })

  }
}


