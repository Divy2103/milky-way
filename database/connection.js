import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

export default async function connect() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(DATABASE_URL).catch((err) => console.log(err));
      console.log("Mongoose Connection Established");
    } else {
      console.log("already connected");
    }
  } catch (err) {
    console.log(err);
  }
}
