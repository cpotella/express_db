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

const actualizarPost = async (likes, id) => {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
    const values = [likes, id];
    const result = await pool.query(consulta, values);
    return result.rows[0];
}

const borrarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    await pool.query(consulta, values);
};


module.exports = { obtenerPost, agregarPost, actualizarPost, borrarPost }
