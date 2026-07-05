const app = require("./app.js");
const connectDB = require("./config/db.js");
require("dotenv").config();


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();