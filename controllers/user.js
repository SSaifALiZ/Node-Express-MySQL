import { getAuth } from "firebase-admin/auth";
import { db } from "../db.js";

export const getUserListings = async (req, res) => {
  const token = req?.headers?.authtoken;
  const userId = req?.params?.userId;
  const user = await getAuth()?.verifyIdToken(token);
  // const user = await getAuth()
  //   ?.verifyIdToken(token)
  //   ?.then((decodedToken) => {
  //     const uid = decodedToken?.uid;
  //     console.log("decodedToken?.uid", decodedToken?.uid);
  //   })
  //   ?.catch((error) => console?.log(error));
  const q = "SELECT * FROM listings WHERE user_id = ?";

  if (user?.user_id !== userId)
    return res?.status(401)?.json("Users can only access their own listings!");

  db?.query(q, [userId], (err, data) => {
    if (err) return res?.status(500)?.json(err);

    return res?.status(200)?.json(data);
  });
};
