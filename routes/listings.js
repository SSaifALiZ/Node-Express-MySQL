import express from "express";
import {
  addView,
  deleteListing,
  getListing,
  getListings,
  postListing,
  updateListing,
} from "../controllers/listing.js";

const router = express?.Router();

router?.get("/", getListings);
router?.get("/:id", getListing);
router?.post("/:id/add-view", addView);
router?.post("/", postListing);
router?.post("/:id", updateListing);
router?.delete("/:id", deleteListing);

export default router;
