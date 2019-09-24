import { Schema } from 'mongoose';

export const User = new Schema({
  id: Number,
  name: String,
});
