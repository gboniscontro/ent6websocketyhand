const express = require('express')
const { Contenedor, Producto } = require('./contenedor')

const path = require('path')
let contenedor = new Contenedor('productos.txt')


const app = express();



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//Engine
app.set('view engine', 'pug');
app.set("views",path.join(__dirname, 'views') );

app.post('/productos', (req, res) => {
    const producto = req.body
    contenedor.save(producto);
    res.redirect('/')
})
app.get('/productos', (req, res) => {
    
    let productos = contenedor.getAll()

    res.render("index", {
        productos,
        productosExists: productos.length
    });
});

app.listen(8080,()=>{
    console.log(`Escuchando en el puerto 8080`);
});