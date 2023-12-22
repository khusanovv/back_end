import mongoose, { Schema } from "mongoose";
const jopsschema = new Schema({
  title:mongoose.SchemaTypes.String,
  price:mongoose.SchemaTypes.String,
  category:mongoose.SchemaTypes.String,
  isSucces:mongoose.SchemaTypes.Boolean,
  date:mongoose.SchemaTypes.String,
  rasm: mongoose.SchemaTypes.String
});
const jops = mongoose.model("jops", jopsschema);
export { jops };
