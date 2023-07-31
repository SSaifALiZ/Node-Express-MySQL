import { v4 as uuid } from "uuid";
import { db } from "../db.js";
import { getAuth } from "firebase-admin/auth";

export const getListings = (req, res) => {
  const q = "SELECT * FROM listings";

  db?.query(q, [req?.query?.cat], (err, data) => {
    if (err) return res?.status(500)?.send(err);
    return res?.status(200)?.json(data);
  });
};

export const getListing = (req, res) => {
  const q = "SELECT * FROM listings WHERE id = ?";

  db?.query(q, [req?.params?.id], (err, data) => {
    if (err) return res?.status(500)?.json(err);

    return res?.status(200)?.json(data[0]);
  });
};

export const addView = (req, res) => {
  const id = req?.params?.id;
  const q = "UPDATE listings SET views = views + 1 WHERE id = ?";

  db?.query(q, [id], (err, data) => {
    if (err) return res?.status(500)?.json(err);
    db?.query("SELECT * FROM listings WHERE id = ?", [id], (error, results) => {
      if (error) return res?.status(500)?.json(error);
      return res?.json(results[0]);
    });
  });
};

export const postListing = async (req, res) => {
  const token = req?.headers?.authtoken;
  const user = await getAuth()?.verifyIdToken(token);
  const userId = user?.user_id;
  const id = uuid();
  const { name = "", description = "", price = 0 } = req?.body;
  const views = 0;
  const values = [id, name, description, price, userId, views];
  const q =
    "INSERT INTO listings (`id`, `name`, `description`, `price`, `user_id`, `views`) VALUES (?)";

  db?.query(q, [values], (err, data) => {
    if (err) return res?.status(500)?.json(err);
    return res?.json({ id, name, description, price, user_id: userId, views });
  });
};

export const updateListing = async (req, res) => {
  const { id } = req?.params;
  const { name = "", description = "", price = 0 } = req?.body;
  const token = req?.headers?.authtoken;
  const user = await getAuth()?.verifyIdToken(token);
  const userId = user?.user_id;
  const q =
    "UPDATE listings SET `name`=?, `description`=?, `price`=? WHERE `id`=? AND `user_id`=?";

  db?.query(q, [name, description, price, id, userId], (err, data) => {
    if (err) return res?.status(500)?.json(err);
    db?.query(
      "SELECT * FROM listings WHERE id = ? AND user_id = ?",
      [id, userId],
      (error, results) => {
        if (error) return res?.status(500)?.json(error);
        return res?.json(results[0]);
      }
    );
  });
};

export const deleteListing = async (req, res) => {
  const { id } = req?.params;
  const token = req?.headers?.authtoken;
  const user = await getAuth()?.verifyIdToken(token);
  const userId = user?.user_id;
  const q = "DELETE FROM listings where `id` = ? AND user_id = ?";

  db?.query(q, [id, userId], (err, data) => {
    if (err) return res?.status(403)?.json("Cannot delete your post!");

    return res?.json("Success!");
  });
};
