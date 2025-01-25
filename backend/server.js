import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import corsOptions from "./config/corsOptions.js";
import connDB from "./config/connDB.js";
import registrationRoute from "./routes/registrationRoute.js";
import loginRoute from "./routes/loginRoute.js";
import postsRoute from "./routes/postsRoute.js";
import commentRoute from "./routes/commentRoute.js";
import likeRoute from './routes/likeRoute.js';
import usersRoute from './routes/usersRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import refreshTokenRoute from "./routes/refreshTokenRoute.js";
import verifyJWT from "./middleware/verifyJWT.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7777;

connDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/register", registrationRoute);
app.use("/login", loginRoute);
app.use("/users", usersRoute)
app.use("/posts", postsRoute);
app.use('/refresh', refreshTokenRoute)
app.use("/logout", logoutRoute);

app.use(verifyJWT)
app.use("/comment", commentRoute);
app.use("/like/:postId", likeRoute);