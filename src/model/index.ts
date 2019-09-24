import mongoose from 'mongoose';
import * as User from './User';

const schemas = [
  User,
];

schemas.forEach(schema => {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const sc in schema) {
    mongoose.model(sc, schema[sc]);
  }
});

export default mongoose.model;
