import mongoose, { model } from "mongoose";

const uri = "mongodb://localhost:27017/dgi";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const dbOpen = (): void => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("database conection");
    })
    .catch((err) => {
      console.error(err);
    });
};

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  ci: Number,
  date: Date,
  deliveredDate: Date,
  delivered: Boolean,
  description: String,
  position: String,
  dependence: String,
});

export const User = model("User", userSchema);

console.log(typeof User)