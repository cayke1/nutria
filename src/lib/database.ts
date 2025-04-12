import { connect } from "mongoose";

const mongodb_uri = process.env.DATABASE_URL as string;

export async function connectDb() {
  try {
    await connect(mongodb_uri);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}
