import mongoose from "mongoose";
import Camp from "../Model/campModel.js";

export const registerCamp=async(req,res)=>{
  try{
    const{campName,contactPerson,contactPersonPhone,email,province,district,city,streetAddress,expectedDonors,startDate,endDate,additionalMessage}=req.body;

    if(!campName||!contactPerson||!contactPersonPhone||!email||!province||!district||!city||!streetAddress||!expectedDonors||!startDate||!endDate){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }
   console.log(req.body);
    const camp=await Camp.create({
      hospitalId:req.user.id,
      campName,contactPerson,contactPersonPhone,email,province,district,city,streetAddress,expectedDonors,startDate,endDate,additionalMessage,
    })
    console.log(camp);
     return res.status(201).json({
      success:true,
      message:'Camp created sucessfully',
      camp,

    });



  }
  catch(error){
     return res.status(500).json({
      success:false,
      message:'Internal Server error'
     });
  }
};

export const getCamp=async(req,res)=>{
   try{
      const camps=await Camp.find({
        hospitalId:req.user.id
      }).sort({createdAt:-1})
     return res.status(200).json({
      success:true,
      message:'Sucessfully  fetched camps',
      camps,
     })
  
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:'Internal server error',
      })
  
    }
}


export const modifyCampStatus=async(req,res)=>{
  try{
    const{id,status}=req.body;
    console.log(status);
    console.log(id);

    
    await Camp.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    return res.status(202).json({
      success:true,
      message:"Changed the request status"
    })
    

  }
  catch(err){
       return res.status(500).json({
      success:false,
      message:'Internal Server error'
    })

  }
}
