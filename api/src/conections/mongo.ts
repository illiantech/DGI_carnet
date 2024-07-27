import mongoose, { model, Schema } from 'mongoose';
import { type UserType } from '../utils/types';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.ROOT_DB ?? 'mongodb://localhost:27017/dgi';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose
  .connect(uri)
  .then(() => {
    console.log('database conection');
  })
  .catch((err) => {
    console.error(err);
  });

const userSchema = new Schema<UserType>({
  name: String,
  ci: Number,
  date: Date,
  deliveredDate: Date,
  delivered: Boolean,
  description: String,
  position: String,
  dependence: String
});

export const User = model('User', userSchema);
