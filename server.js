import express from "express";
import mongoose from "mongoose";
import { shortUrl, getOriginalUrl } from "./Controllers/url.js";



const app = express();



app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017", { dbName: "url_db" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});




app.post("/short", shortUrl);

app.get("/:shortCode", getOriginalUrl);

const port = 1000;
app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
