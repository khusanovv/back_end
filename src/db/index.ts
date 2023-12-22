import mongoose from "mongoose";

export function db() {
  try {
    mongoose.connect(`mongodb+srv://khusanov:WKCS4CDKJZCh1Tgp@cluster0.5mumoty.mongodb.net/`).then(() => {
      console.log("MongoDB Connection Succeded...");
    });
  } catch (error) {
    return "MongoDB Connection Succeeded.";
  }
}



