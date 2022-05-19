import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/*
To keep things clean and readable, we are going
to implement a file system for the server with
routers and controllers
*/

/*this middleware tells the server that 
every route inside of the postsRoutes is going to start
with '/posts'. This is achieved because we add a prefix of 'posts'
to all of the routed in postRoutes.
Example: In postRoutes we have a app.get('/',...)-> this route can only be
reached by using '/posts' as the uri. Meaning, for the client to reach '/'
the uri must be localhost:5000/posts, not localhost:5000/
*/

app.use("/posts", postRoutes);
const PORT = process.env.PORT || 5001;
const db = process.env.MDBCONNECTION_URL;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error));
