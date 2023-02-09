const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Crear una lista en memoria para almacenar información de usuario
const users = [];

// Vista de registro de usuario
app.get('/register', (req, res) => {
  res.send(`
    <form action="/register" method="post">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <label for="address">Dirección:</label>
      <input type="text" id="address" name="address"
required>
<br><br>
<input type="submit" value="Registrarse">
</form>
`);
});

// Manejador de formulario de registro
app.post('/register', (req, res) => {
const { name, password, address } = req.body;

// Compruebe si el usuario ya está registrado
const existingUser = users.find(user => user.name === name);
if (existingUser) {
return res.send('El usuario ya está registrado');
}

// Agregar usuario a la lista en memoria
users.push({ name, password, address });
res.send('Registro exitoso');
});

// Vista de inicio de sesión
app.get('/login', (req, res) => {
res.send( <form action="/login" method="post"> <label for="name">Nombre:</label> <input type="text" id="name" name="name" required> <br> <label for="password">Contraseña:</label> <input type="password" id="password" name="password" required> <br><br> <input type="submit" value="Iniciar sesión"> </form> );
});

// Manejador de formulario de inicio de sesión
app.post('/login', (req, res) => {
const { name, password } = req.body;

// Compruebe si el usuario está registrado
const user = users.find(user => user.name === name && user.password === password);
if (!user) {
return res.send('Credenciales incorrectas');
}

// Lista de usuarios en memoria
const users = [];

// Contador de visitas
let visitCount = 0;

// Vista de registro de usuario
app.get('/register', (req, res) => {
  res.send(`
    <form action="/register" method="post">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <label for="address">Dirección:</label>
      <input type="text" id="address" name="address" required>
      <br><br>
      <input type="submit" value="Registrarse">
    </form>
  `);
});

// Manejador de formulario de registro
app.post('/register', (req, res) => {
  const { name, password, address } = req.body;

  // Compruebe si el usuario ya está registrado
  const existingUser = users.find(user => user.name === name);
  if (existingUser) {
    return res.send('El usuario ya está registrado');
  }

  // Agregar usuario a la lista en memoria
  users.push({ name, password, address });
  res.send('Registro exitoso');
});

// Vista de inicio de sesión
app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required>
      <br><br>
      <input type="submit" value="Iniciar sesión">
    </form>
  `);
});

// Manejador de formulario de inicio de sesión
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Compruebe si el usuario está registrado
  const user = users.find(user => user.name === name && user.password === password);
  if (!user) {
    return res.send('Credenciales incorrectas');
  }

  // Establecer una cookie de sesión para el usuario
  res.cookie('user', name);
  res.redirect('/datos');
});

app.get("/datos", (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    res.render("datos", {
      nombre: req.session.user.nombre,
      password: req.session.user.password,
      direccion: req.session.user.direccion
    });
  });


app.get("/datos", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  if (!req.session.visitas) {
    req.session.visitas = 1;
  } else {
    req.session.visitas += 1;
  }

  res.render("datos", {
    nombre: req.session.user.nombre,
    password: req.session.user.password,
    direccion: req.session.user.direccion,
    visitas: req.session.visitas
  });
});

  
  app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect("/login");
  });
});


app.listen(3000, () => {
console.log('Servidor iniciado en http://localhost:3000');
});