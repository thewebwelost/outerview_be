import { AppDataSource } from '../data-source';

const connectDB = async () => {
  await AppDataSource.initialize()
    .then(() => console.log('Connected to the database'))
    .catch((error) => console.log(error));
};

export default connectDB;
