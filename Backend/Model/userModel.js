import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
  role:{
    type:String,
    required:true,
    enum:['donor','hospital','organization']
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
     type:String,
    required:true,
    
  },
  phoneNumber:{
     type:String,
    required:true,
  },
    province:{
     type:String,
    required:true,

  },
  district:{
     type:String,
    required:true,
  },
  city:{
     type:String,
    required:true,
  },
  streetAddress:{
     type:String,
    required:true,
  },

  //donor specific
   donorName:{
    type:String,
   
  },
  dateOfBirth:{
     type:Date,
   
  },
  gender:{
    type:String,
  
    enum:['male','female']
  },
  bloodGroup:{
    type:String,
   
    enum:['A+','A-','B+','B-','O+','O-','AB+','AB-']
  },
  donations:{
    type:Number,
    default:0,
  },
  lastDonated:{
    type:Date,


  },



  //hospital specific
  hospitalName:{
    type:String,
  
  },
  campsOrganized:{
    type:Number,
    default:0,

  },
   emergencyRequests:{
     type:Number,
    default:0,

   },
    totalDonorsParticipated:{
    type:Number,
    default:0,

    },
 


  //organziation specific
  organizationName:{
   type:String,
   
  },
  organizationType:{
   type:String,
  },

  //hospital and organzaaitonn common
   registrationNumber:{
    type:String,
    
  },
  contactPerson:{
    type:String,
   
  },
  contactPersonNumber:{
    type:String,
    
  },






},{
  timestamps:true,
}
)

const User=mongoose.model("User",userSchema);
export default User;