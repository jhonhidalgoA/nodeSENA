const express = require('express');
const app = express();
const port = 10000;

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

//get the client
const mysql = require('mysql2/promise');

//conexión a la base de datos
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pruebapostman'
});

// Función de login
async function login(req, res) {
    const datos = req.query;
    
    // Protege contra inyecciones SQL utilizando parámetros
    const [filas] = await connection.query("SELECT * FROM usuarios WHERE `nombre` = ? AND `password` = ?", [datos.nombre, datos.password]);

    if (filas.length == 1) {
        // Responde solo con un mensaje de autenticación satisfactoria
        res.json({ mensaje: 'Autenticación satisfactoria' });
    } else {
        // Responde con un error si no hay coincidencia
        res.status(401).send('Usuario o contraseña incorrectos');
    }
}

app.get('/login', login);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


