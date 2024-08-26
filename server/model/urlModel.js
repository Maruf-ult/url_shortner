import mongoose from "mongoose";

 const userModel = mongoose.Schema({
     long_url:{
        type:String,
        required: [true, 'must give a long_url']
    },
     short_url:String,
});

const urlSchema = mongoose.model("url_list",userModel);
export default urlSchema;