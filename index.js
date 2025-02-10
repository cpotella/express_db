const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const { obtenerPost, agregarPost, actualizarPost, borrarPost } = require('./server')

app.listen(port, console.log("SERVIDOR ENCENDIDO"))


app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPost() 
        res.json(posts)
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

})


app.post("/posts", async (req, res) => {
    try {
      const { titulo, img, descripcion, likes } = req.body; 
      const post = await agregarPost(titulo, img, descripcion, likes);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error al insertar el post:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
})



app.put("/posts/like/:id", async (req, res) => {
    try {
      const { id } = req.params; 
      const { likes } = req.body;
      const post = await actualizarPost(likes, id);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
})




app.delete("/posts/:id", async (req, res) => {
    try {
      const { id } = req.params; 
      await borrarPost(id);
      res.send("Viaje eliminado");
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
})
  