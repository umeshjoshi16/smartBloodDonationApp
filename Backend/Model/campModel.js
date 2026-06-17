import mongoose, { mongo } from "mongoose";

const campSchema=new mongoose.Schema({
   hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  campName:{
  type: String,
  required: true
  },
  contactPerson:{
  type: String,
  required: true,
  },
  contactPersonPhone:{
  type: String,
  required: true
  },
email:{
  type: String,
  required: true
},
province:{
  type: String,
  required: true
},
district:{
  type: String,
  required: true
},
city:{
  type: String,
  required: true
},
streetAddress:{
  type: String,
  required: true
},
expectedDonors:{
  type: Number,
  required: true
},
startDate:{
  type: Date,
  required: true
},
endDate:{
  type: Date,
  required: true
},
additionalMessage:{
  type: String,
},
 status: {
      type: String,
      enum: ["Active", "Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },

},{
  timestamps:true,
})

const Camp=mongoose.model('Camp',campSchema);
export default Camp;