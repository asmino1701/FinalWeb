//Librerías de Node necesarias
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));
//Conexión a la BDD creada en MySQL
var connection = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'nodedb',
  port: "3306"

});

//Inicio de la conexión a la BDD
connection.connect();

//Método Post para almacenar la información en la base de datos
app.post('/datos', function (req, res) {
  var post = req.body;
  console.log(post);
  connection.query('INSERT INTO Datos VALUES (?,?)', [post.ciudad, post.datos], function (error, results) {
    if (error) throw error;
    //volver a cargar la página de inicio  
    res.redirect('http://127.0.0.1:8975/index.html');
    console.log("1 dato insertado");
  });
});

//Escucha del servidor en el puerto 3000
app.listen(3000, function () {
  console.log('Conexión en el puerto 3000');
});