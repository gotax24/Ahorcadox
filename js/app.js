// Variables globales para todas las funciones
let rayas = [];
let texto = [];
let fallidos = [];
let p = document.getElementById("result");
let intentos = 10;
let resultado = document.getElementById("resultado");
const MAX_INTENTOS = 10; // Definimos un valor constante para intentos máximos

// Función para resetear los input
const reset = () => {
  document.getElementById("palabra").value = "";
  document.getElementById("intentos").value = "";
};

// Función para reiniciar el juego después de 15 sg de ganar o perder
const reiniciar = () => {
  rayas = [];
  fallidos = [];
  texto = [];
  intentos = MAX_INTENTOS;
  p.innerHTML = "";
  resultado.innerHTML = "";
  document.getElementById("fallidos").innerHTML = "";
  reset()
};

// Función para iniciar el juego solo una vez por partida
const iniciar = () => {
  let palabra = document.getElementById("palabra").value.toLowerCase().trim();

  // Si la palabra está vacía no se inicia
  if (palabra === "") {
    alert("La palabra está vacía");
    return;
  }

  texto = palabra.split("");
  resultado.innerHTML = `Te quedan ${MAX_INTENTOS} intentos`;

  // Verificación para que no sigan agregando palabras
  if (rayas.length > 0) {
    alert("Tienes que adivinar primero la palabra para agregar otra.");
    return;
  }

  rayas = new Array(palabra.length).fill("_");
  p.innerHTML = `La palabra es: ${rayas.join(" ")}`; // Unimos rayas con espacio
  reset();
};

// Función para comprobar letra por letra en el juego
const comprobar = () => {
  let letra = document.getElementById("intentos").value.toLowerCase().trim();
  let ol = document.getElementById("fallidos");
  let encontrada = false;

  // Validación de input: letra vacía o más de un carácter
  if (letra === "" || letra.length !== 1) {
    alert("Introduce una letra válida");
    return;
  }

  // forEach para encontrar las letras y cambiar el status de encontradas
  texto.forEach((element, index) => {
    if (element === letra) {
      rayas[index] = letra;
      encontrada = true;
    }
  });

  // Si la letra no es encontrada, se agrega a las fallidas
  if (!encontrada) {
    if (!fallidos.includes(letra)) {
      // Si la letra no está ya en fallidos
      fallidos.push(letra);
      ol.innerHTML = `Letras que no están: ${fallidos.join(", ")}`;
      intentos--; // Decrementa el número de intentos al fallar
    }
  }

  // Actualiza el mensaje de intentos restantes
  resultado.innerHTML = `Te quedan ${intentos} intentos`;

  // Si el número de intentos llega a 0, se ejecuta la función loser
  if (intentos === 0) {
    loser();
  } else if (rayas.join("") === texto.join("")) {
    // Si se adivina la palabra completa
    winner();
  }

  // Actualiza la palabra mientras vayan adivinando
  p.innerHTML = `La palabra es: ${rayas.join(" ")}`;
};

// Función para cuando el jugador pierde
const loser = () => {
  resultado.style.color = "red"; // Se le cambia el color a rojo al texto
  resultado.innerHTML = `PERDISTE <br> La palabra era: ${texto.join(
    ""
  )}. ¡Qué loser! Jajaja`;
  setTimeout(reiniciar, 15000); // Se reinicia el juego después de 15 sg de perder
};

// Función para cuando el jugador gana
const winner = () => {
  resultado.style.color = "greenyellow"; // Se le cambia el color a verde al texto
  resultado.innerHTML = `GANASTE <br> Adivinaste la palabra: ${texto.join(
    ""
  )}. ¡Enhorabuena matador!`;
  setTimeout(reiniciar, 15000); // Se reinicia el juego después de 15 sg de ganar
};
