import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  user_name: String,
  email: {
    type: String,
  },
  password: {
    type: String, 
    required: true,
  },
  phone:{
    type: Number,
  },
  price:{
    type: String
  }
  ,
  date:{
    type:String
  },
  fullname:{
    type:String
  },
  degree:{
    type:String
  },
  position:{
    type:String
  },
  info:{
    type:String
  },
  salary:{
    type:Number
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});
const User = mongoose.model("Users", UserSchema);
export { User };
