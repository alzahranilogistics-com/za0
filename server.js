import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccountKey.json")
});

app.post("/send", async (req, res) => {
  const { title, body, token } = req.body;
  try {
    await admin.messaging().send({
      token,
      notification: { title, body }
    });
    res.send({ success: true });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
