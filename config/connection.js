const { connect, connection } = require("mongoose");

connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
