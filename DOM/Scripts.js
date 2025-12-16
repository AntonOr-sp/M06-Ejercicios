function eje1() {
    document.getElementById("titulo").innerHTML = "Título actualizado";
    document.getElementById("parrafo").innerHTML = "Texto actualizado";
    console.log("Todo actualizado");
}

function eje2() {
    let mascota = document.getElementById("mascota");
    mascota.src = "Media/rana1.jpg"
    document.getElementById("description").textContent = "Imagen actualizada";
}

function eje3() {
    //ElementHTML document.createElement()
    let parrafo = document.createElement("p");
    parrafo.textContent = "Este es un párrafo añadido"
    document.getElementById("contenedor").appendChild(parrafo);
}

function tecladoNumerico() {
    let valueNumbers = 9;
    let gradient = "";
    let teclado = document.getElementById("teclado");

    for (let i = 1; i < valueNumbers + 1; i++) {
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>" + i + "</p>";
        tecla.className = "tecla";

        cambiarFondoNum(i, tecla);

        tecla.setAttribute('onclick', "escribeTecla('" + i + "')");

        teclado.appendChild(tecla);

    }
}

function cambiarFondoNum(i, tecla) {


    if (i % 2 == 0) {
        tecla.style.background = "blue";
        tecla.style.color = "white";
    }

    if (i % 3 == 0) {
        tecla.style.background = "red";
        tecla.style.color = "white";
    }

    if (i % 5 == 0) {
        tecla.style.background = "green";
        tecla.style.color = "white";
    }

    if (esPrimo(i)) {
        tecla.style.background = "black";
        tecla.style.color = "white";
    }



}

function esPrimo(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function tecladoABC() {
    let teclado = document.getElementById("tecladoABC");

    for (let i = 65; i < 91; i++) {
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>" + String.fromCharCode(i) + "</p>";
        tecla.className = "tecla";

        cambiarFondoABC(i, tecla);

        tecla.setAttribute('onclick', "escribeTecla('" + String.fromCharCode(i) + "')");

        teclado.appendChild(tecla);

    }
}

function cambiarFondoABC(i, tecla) {


    if (i === 65 || i === 69 || i === 73 || i === 79 || i === 85 || i === 89) {
        tecla.style.background = "green";
        tecla.style.color = "white";
    } else {
        tecla.style.background = "orange";
    }



}

function escribeTecla(letra) {
    console.log(letra);
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent.length < 5) {
        miTexto.textContent += letra
        console.log("Has añadido " + letra + " y ahora hay: " + miTexto.textContent)
    } else {
        miTexto.style.backgroundColor = "red";
        console.log("Demasiado largo");
    }
}

function borraLetra() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent.length > 0) {
        miTexto.textContent = miTexto.textContent.substring(0, miTexto.textContent.length - 1);
    }
}

function comprobar() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent == palabra) {
        miTexto.backgroundColor = "green";
        alert("Respuesta correcta!");
    } else {
        miTexto.backgroundColor = "red";
        alert("No has adivinado la palabra :(");
    }
}

let palabra = "";
function palabraSecreta() {
    fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
        .then(response => response.json())
        .then(data => {
            palabra = data[0]; // La API devuelve un array, ej: ["perro"]

            palabra = palabra.toUpperCase();
            console.log("Tu palabra secreta es:", palabra);

        });
}


tecladoABC();

tecladoNumerico();

palabraSecreta();