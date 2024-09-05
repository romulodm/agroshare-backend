const express = require('express');
const cors = require('cors');
const path = require("path");
const db = require('./config/db.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server running!');
});

require('./infra/jobs/scraperJob.js');

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


const apiPrefix = '/agroshare/api/v1'

app.use(apiPrefix + '/users', require('./infra/server/routes/user.js'));

db.sync().then(() => { 
    app.listen(process.env.PORT)
    console.log(`Server running on PORT: ${process.env.PORT}`);
}).catch(err => console.log(err))