import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import admin from "firebase-admin";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import listingRoutes from "./routes/listings.js";
import credentials from "./credentials.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

app?.use(express?.json());
app?.use(cookieParser());

const storage = multer?.diskStorage({
  destination: (req, file, cb) => cb(null, "../client/public/upload"),
  filename: (req, file, cb) => cb(null, Date?.now() + file?.originalname),
});

const upload = multer({ storage });

app?.post("/api/upload", upload?.single("file"), (req, res) => {
  const file = req?.file;
  res?.status(200)?.json(file?.filename);
});

app?.use("/api/auth", authRoutes);
app?.use("/api/users", userRoutes);
app?.use("/api/posts", postRoutes);
app?.use("/api/listings", listingRoutes);

app?.listen(8800, () => console.log("Connected...!!!!"));
