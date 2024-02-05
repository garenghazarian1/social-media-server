
import express from "express";
import morgan from "morgan";
import connectDB from "./lib/mongo-db.js";
import { port } from "./lib/env-vars.js";
import postRouter from "./routes/postRouter.js";
import cors from 'cors';
import authRouter from "./routes/authRouter.js";
import commentRouter from "./routes/commentRouter.js";

const app = express();
connectDB();
app.use(express.json());

app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/uploads", express.static("uploads"));

app.use('/posts', postRouter);
app.use("/auth", authRouter);
app.use("/comments", commentRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
  
});
