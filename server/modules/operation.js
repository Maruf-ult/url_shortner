import urlSchema from "../model/urlModel.js";
import shortid from "shortid";


export const sendUrl = async (req, res) => {
    const { long_url } = req.body;

    try {
        const short_id = shortid.generate();
        const short_url = `http://localhost:3000/api/tiny_url/${short_id}`;
        const newUrl = new urlSchema({ long_url, short_url });
        await newUrl.save();
        return res.status(201).json({ success: true, msg: "largeUrl posted successfully", newUrl });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, msg: "Bad gateway" });
    }
};


export const tiny_Url = async (req, res) => {
    const { short_id } = req.params;

    try {
        const url = await urlSchema.findOne({ short_id });
       
        if (!url) {
            return res.status(404).json({ success: false, msg: "URL not found" });
        }
        return res.redirect(url.long_url);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, msg: "Bad gateway" });
    }
};

export const getUrl = async (req, res) => {
  try {
      const url = await urlSchema.find();
      if (!url) {
          return res.status(404).json({ success: false, msg: "URL not found" });
      }
      return res.status(200).json({ success: true, all_url: url });
  } catch (error) {
      console.log(error);
      return res.status(401).json({ success: false, msg: "Bad gateway" });
  }
};
