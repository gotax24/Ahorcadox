//variables globales para todas las funciones 
let rayas = [];
let texto = [];
let fallidos = [];
let p = document.getElementById("result");
let intentos = 10;
let resultado = document.getElementById("resultado");


//funcion para resetear los input
const reset = () => {
  document.getElementById("palabra").value = "";
  document.getElementById("intentos").value = "";
};


//funcion para reiniciar el juego despues de 15 sg de ganar o perder
const reiniciar = () => {
  rayas = [];
  fallidos = [];
  texto = [];
  intentos = 10;
  p.innerHTML = "";
  resultado.innerHTML = "";
  document.getElementById("fallidos").innerHTML = "";
};


//funcion para iniciar el juego solo se una vez por partida
const iniciar = () => {
  let palabra = document.getElementById("palabra").value.toLowerCase();

  //si la palabra esta vacia no se inicia
  if (palabra === "") {
    alert("La palabra esta vacia");
  } else {
    texto = palabra.split("");
    resultado.innerHTML = `Te quedan ${10} intentos`;

    //verificacioon para que no sigan agregando palabras
    if (rayas.length > 0) {
      alert("Tienes que adivinar primero la palabra para agregar otra");
    } else {
      rayas = new Array(palabra.length).fill("_");
    }

    p.innerHTML = `La palabara es: ${rayas}`;
    reset();
  }
};

//funcion para comprobar letra por letra en el juego
const comprobrar = () => {
  let letra = document.getElementById("intentos").value.toLowerCase();
  let ol = document.getElementById("fallidos");
  let enconntrada = false;

  //forEach para encontrar las letras y cambiar el status de encontradas
  texto.forEach((element, index) => {
    if (element === letra) {
      rayas[index] = letra;
      enconntrada = true;
      reset();
    }
  });


  //Si encontrada es falso se agrega la letra a las fallidas que se muestra en el html
  if (!enconntrada) {
    if (!fallidos.includes(letra)) {//si la letra no esta agregada se agrega para que no se repitan las letras
      fallidos.push(letra);
      ol.innerHTML = `Letras que no están: ${fallidos.join(", ")}`;
      intentos--; // Decrementa el número de intentos al fallar
      reset();
    }
  }

  // Actualiza el mensaje de intentos restantes
  resultado.innerHTML = `Te quedan ${intentos} intentos`;

  //si el numero de intentos llega a 0 se ejecuta la funcion loser
  if (intentos === 0) {
    loser();
  } else if (rayas.every((element, index) => element === texto[index])) { //si se adivina la palabra y ya no hay rayas se ejecuta la funcino winner
    winner();
  }

  // Actualiza la palabra mientra que vayan adivinando 
  p.innerHTML = `La palabara es: ${rayas}`;
};


//funcion para cuando el jugador pierde
const loser = () => {
  resultado.style.color = "red"; //se le cambia el color a rojo al texto
  resultado.innerHTML = `PERDISTE </br> la palabra era: ${texto}. Que loser jajajaja`;
  setTimeout(reiniciar, 15000);// se le reinicia el juego despues de 15 sg de perder
};

//funcion para cuando el jugador gana
const winner = () => {
  resultado.style.color = "greenyellow"; //se le cambia el color a verder al texto
  resultado.innerHTML = `GANASTE </br> Adivinaste la palabra era: ${texto}. Enhorabuena matador`;

  setTimeout(reiniciar, 15000);// se le reinicia el juego despues de 15 sg de ganar
};
