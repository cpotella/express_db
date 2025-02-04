const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: 'postgres',
  port: 5432,
  allowExitOnIdle: true
});


const obtenerPost = async () => {
    const consulta = "SELECT * FROM posts ORDER BY id DESC"
    const result = await pool.query(consulta)
    return result.rows
}


const agregarPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(consulta, values);
    return result.rows[0];
}


module.exports = { obtenerPost, agregarPost }
