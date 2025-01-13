const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecomerce",
  connectionLimit: 10,
  waitForConnections: true,
});

// Verificar la conexión inicial con una consulta
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa al pool de la base de datos");
  connection.release(); // Libera la conexión al pool
});

module.exports = db;
