const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./app');

mongoose.connect(process.env.DATABASE_LOCAL)
.then(() => console.log("DB Connection Successful"))
.catch(err => {
  console.error("❌ DB Connection Failed:", err.message);
  process.exit(1); // Exit app if DB fails
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

//For handling unhandled Rejections out of express like database goes down b/c of some reasons
process.on('unhandledRejections', err => {
    server.close(() => {
        process.exit(); // by default 0 which means everything was fine and 1 means there is an error
    })
});

//for handling uncaught exceptions means errors in synchronoud code that is not handled anywhere
process.on('uncaughtException', err => {
    server.close(() => {
        process.exit();
    })
});