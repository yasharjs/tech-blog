//require
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize})
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))
app.use(session(sess));

// turn on routes
app.use(routes);

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=>console.log(`Now listening ${PORT}`));
})