const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/cryptoplace`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting to MongoDB");
    process.exit(1);
  }
};

module.exports = connectMongoDB;
