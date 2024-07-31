let rayas = [];
let texto = [];
let fallidos = [];
let p = document.getElementById("result");
let intentos = 10;
let resultado = document.getElementById("resultado");

const reset = () => {
  document.getElementById("palabra").value = "";
  document.getElementById("intentos").value = "";
};

const reiniciar = () => {
  rayas = [];
  fallidos = [];
  texto = [];
  intentos = 10;
  p.innerHTML = "";
  resultado.innerHTML = "";
  document.getElementById("fallidos").innerHTML = "";
};

const iniciar = () => {
  let palabra = document.getElementById("palabra").value;

  if (palabra === "") {
    alert("La palabra esta vacia");
  } else {
    texto = palabra.split("");
    resultado.innerHTML = `Te quedan ${10} para ganar`;

    if (rayas.length > 0) {
      alert("Tienes que adivinar primero la palabra para agregar otra");
    } else {
      rayas = new Array(palabra.length).fill("_");
    }

    p.innerHTML = `La palabara es: ${rayas}`;
    reset();
  }
};

const comprobrar = () => {
  let letra = document.getElementById("intentos").value;
  let ol = document.getElementById("fallidos");
  let enconntrada = false;

  texto.forEach((element, index) => {
    if (element === letra) {
      rayas[index] = letra;
      enconntrada = true;
      reset();
    }
  });

  if (!enconntrada) {
    if (!fallidos.includes(letra)) {
      fallidos.push(letra);
      ol.innerHTML = `Letras que no están: ${fallidos.join(", ")}`;
      intentos--; // Decrementa el número de intentos al fallar
      reset();
    }
  }

  // Actualiza el mensaje de intentos restantes
  resultado.innerHTML = `Te quedan ${intentos} intentos`;

  if (intentos === 0) {
    loser();
  } else if (rayas.every((element, index) => element === texto[index])) {
    winner();
  }

  p.innerHTML = `La palabara es: ${rayas}`;
};

const loser = () => {
  resultado.style.color = "red";
  resultado.innerHTML = `PERDISTE </br> la palabra era: ${texto}. Que loser jajajaja`;
  setTimeout(reiniciar, 15000);
};

const winner = () => {
  resultado.style.color = "greenyellow";
  resultado.innerHTML = `GANASTE </br> Adivinaste la palabra era: ${texto}. Enhorabuena matador`;

  setTimeout(reiniciar, 15000);
};
