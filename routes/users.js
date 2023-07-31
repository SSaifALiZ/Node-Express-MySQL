import express from "express";
import { getUserListings } from "../controllers/user.js";

const router = express?.Router();

router?.get("/:userId/listings", getUserListings);

export default router;
