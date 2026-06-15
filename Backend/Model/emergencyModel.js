import mongoose from "mongoose";

const emergencySchema=new mongoose.Schema({
   hospitalId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
province: {
  type: String,
  required: true
},
city: {
  type: String,
  required: true
},
  patientName:{
    type:String,
    required:true,
  },
  patientContact:{
    type:String,
    required:true,

  },
  bloodGroup:{
    type:String,
    required:true,
    enum:['A+','A-','B+','B-','O+','O-','AB+','AB-']
    
  },
  unitsRequired:{
    type:Number,
    required:true,

  }, 
  urgency:{
    type:String,
    required:true,
    enum:['Immediate','Today','Within 24 hrs']
  },
  reason:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,

    

  },
  status:{
    type:String,
    required:true,
    enum:['Active','Fulfilled','Cancelled'],
     default: "Active",
  },
   respondedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

},
 {
    timestamps: true,
  }
)

const Emergency=mongoose.model('Emergency',emergencySchema);
export default Emergency;