import mongoose from "mongoose";

export const dbCn = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/url_collection");
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};