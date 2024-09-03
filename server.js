const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const path = require("path");
const db = require('./config/db.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    if (req.headers.user) {
        req.user = JSON.parse(req.headers.user); 
    }
    next();
});

app.use(
    "/user-image",
    express.static(path.resolve(__dirname, ".", "tmp"))
);

db.sync().then(() => { //{force:true}
    server.listen(process.env.PORT)
    console.log(`Server running on PORT: ${process.env.PORT}`);
}).catch(err => console.log(err))
