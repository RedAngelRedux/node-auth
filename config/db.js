const { mongo } = require("mongoose");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once("open", () => console.log(`Connected to mongo at ${process.env.DB_URL}`));

module.exports = mongoose;