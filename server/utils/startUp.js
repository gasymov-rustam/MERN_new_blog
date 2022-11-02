import mongoose from 'mongoose';
import { addMiddleware } from './addMiddleware.js';
import { connectionString, PORT } from './constants.js';

export const startUp = async (app) => {
  addMiddleware(app);

  try {
    await mongoose.connect(connectionString);

    app.listen(PORT, () => console.log(`🚀 server has been started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
