// Importar nuestras dependencias
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

// Instanciar nuestras dependencias
const app = express();

// Creamos nuestra sesión
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session);

// Crear la sesión de usuario con passport
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    User.findOne({username: username}, (err, user) =>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false);
        }
        if(!user.verifyPassword(password)){
            return done(null, false);
        }
        return done(null, user);
    });
}));

// Serializar y des-serializar las funciones
passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
        done(err, user)
    });
});

// Ruta de login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

// Configuramos el servidor

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});