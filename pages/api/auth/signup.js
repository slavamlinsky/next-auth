import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // console.log("Password Length", password.trim().length);

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 6 characters long.",
      });
      return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const candidate = await db.collection("users").findOne({ email: email });

    if (!candidate) {
      const hashPass = await hashPassword(password);
      const newUser = { email: email, password: hashPass };
      const result = await db.collection("users").insertOne(newUser);
      newUser._id = result.insertedId;

      res.status(201).json({ message: "User Created!", user: newUser });
    } else {
      res.status(422).json({
        message: "User with this email already exists.",
      });
      client.close();
      return;
    }
  }
}

export default handler;
