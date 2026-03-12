import { Url } from "../Models/Url.js";
import shortid from "shortid";



export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  const shortUrl = `http://localhost:1000/${shortCode}`;

  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();

  console.log("short saved = ", newUrl);

  res.render("index", { shortUrl });
};


export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  const url = await Url.findOne({ shortCode });

  if (url) {
    res.redirect(url.longUrl);
  } else {
    res.status(404).send("URL not found");
  }
};
