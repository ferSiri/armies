const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const db = require('./models/db');
const models = require('./models/index').modelos;

const app = express();

const PORT = process.env.PORT;

db.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log('listening at ' + PORT);
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_S));

app.use(session({ secret: process.env.SESSION_S, resave: false, saveUninitialized: false }));

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    models.User.findOne({ where: { id: user.id } })
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err));
});

passport.use(new LocalStrategy((username, password, done) => {
    models.User.findOne({ where: { email: username } })
        .then((user) => {
            if (user) {

                pass = user ? user.password : "";

                if (user.validPassword(password, pass, done, user)) return done(null, user)

                else return done(null, false, { message: "Contraseña incorrecta" })

            } else {

                return done(null, false, { message: "No existe el usuario" })
            }
        });

}))

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'front')));

app.use('/api', require('./routes/index'));

app.post('/api/signup', (req, res) => {
    models.User.findOrCreate({ where: { email: req.body.email }, defaults: { nombre: req.body.nombre, email: req.body.email, password: req.body.password } })
        .spread(function (user, created) {
            if (!created) {
                console.log("no creado")
                res.send({ nombreUsado: true });
            } else {
                console.log("creado")
                res.send(user);
            }
        })
});

app.post('/api/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) return res.send(info);
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            res.send(user);
        });
    })(req, res, next);
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(function () {
        res.clearCookie('connect.sid').send('bien');
    });
    /* return res.send('deslogeado') */
});


app.get('/*', checkAuthenticated, function (req, res) {
    res.sendFile(path.resolve('./front/index.html'));
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated() || req.path == "/login") {
        return next()
    }
    res.redirect('/login')
}
