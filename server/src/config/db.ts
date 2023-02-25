import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn: any = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.italic.underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
