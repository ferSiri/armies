const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./models/db');
const models = require('./models/index').modelos;

const app = express();

const PORT = process.env.PORT || 5001;

db.sync({ force: false }).then(function () {
    //BORRAR
    /*  models.User.findOne({ where: { nombre: 'admin' } })
         .then((user) => {
             if (!user) {
                 models.User.build({ nombre: 'admin', password: 'admin' }).save();
             } else {
                 console.log(user)
             }
         }) */
    app.listen(PORT, function () {
        console.log('listening at ' + PORT);
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('un re secreto'));

app.use(session({ secret: 'un re secreto', resave: false, saveUninitialized: false }));

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
    models.User.findOne({ where: { nombre: username } })
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
    models.User.create({
        nombre: req.body.nombre,
        password: req.body.password
    }).then(() => {
        console.log('usuario creado');
        /* res.redirect('/') */
    });
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
    console.log("pasa por acaaaa")
    if (req.isAuthenticated() || req.path == "/login") {
        return next()
    }
    res.redirect('/login')
}
