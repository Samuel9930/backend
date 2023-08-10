const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock base de datos de usuarios (sustituye esto con una base de datos real)
const users = [];

// Función para generar el token de autenticación (JWT) utilizando la información del usuario
const generateAuthToken = (userInfo) => {
  const secretKey = process.env.JWT_SECRET; // Obtén el secreto desde la variable de entorno
  const expiresIn = '1h'; // Duración del token (1 hora en este ejemplo)

  if (!secretKey) {
    throw new Error('El secreto JWT no está configurado en la variable de entorno.');
  }

  // Crea el token utilizando la información del usuario y firma con la clave secreta
  const token = jwt.sign(userInfo, secretKey, { expiresIn });

  return token;
};


// Ruta para el registro de nuevos usuarios
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // Verifica que no haya campos vacíos
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Verifica si el usuario ya existe
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'El usuario ya está registrado.' });
  }

  // Crea un nuevo usuario y lo agrega a la base de datos
  const newUser = { id: Date.now().toString(), username, email, password };
  users.push(newUser);

  // Genera el token de autenticación para el nuevo usuario
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  // Genera el token de autenticación para el usuario, incluyendo el nombre
  const token = generateAuthToken({ id: user.id, username: user.username, email: user.email, name: user.name });

  return res.status(201).json({ user: { id: newUser.id, username: newUser.username, email: newUser.email }, token });
});

// Ruta para el login de usuarios existentes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Verifica que no haya campos vacíos
  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Busca el usuario en la base de datos
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  // Genera el token de autenticación para el usuario
  const token = generateAuthToken({ id: user.id, username: user.username, email: user.email });

  return res.status(200).json({ user: { id: user.id, username: user.username, email: user.email }, token });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Servidor backend escuchando en http://4.246.202.161:' + PORT);
});
