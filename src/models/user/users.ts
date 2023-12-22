import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  first_name: String,
  email: {
    type: String,
  },
  password: {
    type: String, 
    required: true,
  },
  country:{
    type: String,
  },
  site:{
    type: String
  }
  ,
  education:{
    type:String
  },
  language:{
    type:String
  },
  sertificate:{
    type:String
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});
const User = mongoose.model("Users", UserSchema);
export { User };
