import { connectDB } from '../../utils/mongo';
import model from '../../model';

export const getUserInfo = async (id: Number) => {
  await connectDB();
  return model('User').find({ id });
};

export const createUser = async (id: Number, name: String) => {
  await connectDB();
  const User = model('User');
  const user = new User({ id, name });
  await user.save();
  return user;
};
