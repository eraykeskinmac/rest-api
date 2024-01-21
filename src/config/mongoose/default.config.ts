require("dotenv").config({ path: ".env.local" });

export default {
  id: "default",
  url: process.env.MONGO_URL,
  connectionOptions: {},
};
