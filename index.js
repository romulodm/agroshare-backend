const express = require('express');
const session = require('express-session');
const cors = require('cors');
const RedisStore = require('connect-redis').default;
const path = require("path");
const pg = require('./config/sequelize')
const redisClient = require('./config/redis')

pg.sync()
.then(() => { console.log("Connected on PostgreSQL!") })
.catch(err => console.log('An error ocurred on PostgreSQL connection attempt:', err));

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

app.get('/ping', (req, res) => {
    res.send('Pong!');
});

require('./jobs/scraper.js');

app.use((req, res, next) => {
    if (req.headers.user) {
        req.user = JSON.parse(req.headers.user); 
    }
    next();
});

app.use(
    "/uploads/implements",
    express.static(path.resolve(__dirname, ".", "uploads", "implements"))
);

const apiPrefix = '/agroshare/api/v1'

app.use(apiPrefix + '/auth', require('./server/routes/auth.route.js'));
app.use(apiPrefix + '/users', require('./server/routes/user.route.js'));
app.use(apiPrefix + '/email', require('./server/routes/email.route.js'));
app.use(apiPrefix + '/commodities', require('./server/routes/commodities.route.js'));
app.use(apiPrefix + '/posts', require('./server/routes/posts.route.js'));
app.use(apiPrefix + '/comments', require('./server/routes/comments.route.js'));

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on PORT: ${process.env.PORT}`);
});