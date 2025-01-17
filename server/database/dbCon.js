import mongoose from "mongoose";

export const dbCn = async () => {
  try {
    await mongoose.connect("https://url-shortner-1-agxz.onrender.com/url_collection");
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
