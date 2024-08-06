const mongoose = require("mongoose");

const config = require("./config");

module.exports = () => {
  mongoose
    .connect(config.mongoUri, {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB has been connected"))
    .catch((e) => console.log(e));
};

// // подключаемся к серверу mongo
// mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });
