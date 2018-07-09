// The text appears in "Tools > Web development > Web console"

var humidity, temp, city;
var main;
var api_path = "http://api.openweathermap.org/data/2.5/forecast?q=";
var api_key = "&APPID=a4dd910c78c8a96fc95e9e6464677d65";
var units = "&units=metric";
var input;
var inputDatos;
var img;
var writer;

function setup() {
  createCanvas(1280, 1280);
  var button = select("#submit"); // Install the library p5.dom.js to use select()
  button.mousePressed(weatherAsk);
  input = select("#city");
  inputDatos = select("datos");
  img = loadImage("/ecuator.jpg"); // Carga la imagen de Ecuador
}

function weatherAsk() {
  var url = api_path + input.value() + api_key + units; // Concateno los valores necesarios para que la API me devuelva la información
  loadJSON(url, getData);
}

function draw() {
  background(0);
  fill(255);
  image(img, 0, 0);
  //Dibuja puntos en la imagen
  if (city=="Quito") {
    text("Ciudad: " + city, 520, 220);
    ellipse(560, 250, 25, 25);
  }else if (city=="Guayaquil") {
    text("Ciudad: " + city, 260, 620);
    ellipse(320, 650, 25, 25);
  }else if (city=="Cuenca") {
    text("Ciudad: " + city, 450, 750);
    ellipse(480, 770, 25, 25);
  }
}

function getData(data) {
  var list = data.list;
  var item = list[0];
  main = item.main;
  temp = main.temp;
  press = main.pressure;
  humidity = main.humidity;
  wind = item.wind.speed;
  print("Temperatura = " + temp); // This message appears in the development tool of the browser
  print("Humedad = " + humidity); // This message appears in the development tool of the browser
  city=document.getElementById("city").value;
  document.getElementById("ciudad").value = city;
  document.getElementById("datos").value = JSON.stringify(main);

  document.getElementById("temperatura").value = temp+" °C";
  document.getElementById("presion").value = press + " hpa";
  document.getElementById("humedad").value = humidity + "%";
  document.getElementById("viento").value = wind + "m/s";
}

function keyPressed() {
  if (keyCode === ENTER) {
    weatherAsk();
  } 
}
