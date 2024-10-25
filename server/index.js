const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Asegúrate de que tu contraseña sea correcta si la tienes configurada
    database: "bdlab"
});

app.post("/create", (req, res) => {
    const { nombre, estado, modelo, serie, mouse, teclado, escritorio } = req.body;

    db.query(
        'INSERT INTO computadoras (nombre, estado, modelo, serie, mouse, teclado, escritorio) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, estado, modelo, serie, mouse, teclado, escritorio],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro exitoso:", result);
                res.status(200).send("Registro exitoso");
            }
        }
    );
});

app.get("/computadoras", (req, res) => {
    db.query(
        'SELECT * FROM computadoras',       
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                res.send(result);
            }
        }
    );
});


app.put("/update", (req, res) => {
    const { id, nombre, estado, modelo, serie, mouse, teclado, escritorio } = req.body;
    
    // Validar que todos los campos necesarios estén presentes en la solicitud
    if (!id || !nombre || !estado || !modelo || !serie || !mouse || !teclado || !escritorio) {
        return res.status(400).send("Todos los campos son requeridos");
    }
    
    db.query(
        'UPDATE computadoras SET nombre = ?, estado = ?, modelo = ?, serie = ?, mouse = ?, teclado = ?, escritorio = ? WHERE id = ?',       
        [nombre, estado, modelo, serie, mouse, teclado, escritorio, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro exitoso:", result);
                res.send("Computadora actualizada exitosamente");
            }
        }
    );
});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        'DELETE FROM computadoras WHERE id = ?',  
      [id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error interno del servidor");
            } else {
                console.log("Registro eliminado:", result);
                res.send("Computadora eliminada exitosamente");
            }
        }
    );
});





app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});
