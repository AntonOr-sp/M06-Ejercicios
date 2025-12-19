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

        tecla.setAttribute('onclick', "escribeTeclaW('" + String.fromCharCode(i) + "')");

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
        miTexto.style.backgroundColor = "rgb(220, 220, 220)";
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
        miTexto.style.backgroundColor = "green";
        alert("Respuesta correcta!");
    } else {
        miTexto.style.backgroundColor = "red";
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

function matrizLetras() {
    let matriz = document.getElementById("matriz");

    for (let i = 1; i < 7; i++) {
        let line = document.createElement("div");
        line.innerHTML = "";
        line.setAttribute("id", "line" + i);

        matriz.appendChild(line);

        for (let a = 1; a < 6; a++) {
            let cajaLetra = document.createElement("div");
            cajaLetra.setAttribute("id", "caja" + i + "-" + a);
            cajaLetra.innerHTML = "";

            let lineID = document.getElementById("line" + i);
            lineID.appendChild(cajaLetra);
        }

        //tecla.setAttribute('onclick', "escribeTecla('" + i + "')");


    }
}

let linea = 1;
let caja = 1;
function escribeTeclaW(letra) {
    let miTexto = document.getElementById("caja" + linea + "-" + caja);
    console.log(letra);
    console.log(miTexto);
    if(linea < 7){
        if(caja < 6){
            if (miTexto.textContent.length < 1) {
                miTexto.textContent += letra
                miTexto.style.backgroundColor = "rgb(220, 220, 220)";
                if(caja < 5){
                caja++;
                }
            }
        } else {
            alert("La palabra es demasiada larga");
        }
    }
}

function borraLetraW() {
    let miTexto = document.getElementById("caja" + linea + "-" + caja);
    console.log(caja);
    console.log(linea);
    if (miTexto.textContent.length === 0 && caja > 1) { 
        caja--;
        miTexto = document.getElementById("caja" + linea + "-" + caja); 
    }
    miTexto.textContent = miTexto.textContent.substring(0, miTexto.textContent.length - 1);
    miTexto.style.backgroundColor = "";
}

function comprobarW() {
    let intento = "";
    let cajas = [];

    for (let i = 1; i <= 5; i++) {
        let cajaLetra = document.getElementById("caja" + linea + "-" + i);
        intento += cajaLetra.textContent;
        cajas.push(cajaLetra);
    }

    if (intento.length < 5) {
        alert("La palabra es incompleta! Añade más letras.");
        return;
    }

    if(linea > 5){
        alert("No has adivinado la palabra :( Palabra correcta es: " + palabra);
    }

    for (let i = 0; i < 5; i++) {
        let letra = intento[i];

        if (letra === palabra[i]) {
            cajas[i].style.backgroundColor = "green";
            cajas[i].style.color = "white";

        } else if (palabra.includes(letra)) {
            cajas[i].style.backgroundColor = "orange";
            cajas[i].style.color = "white";

        } else {
            cajas[i].style.backgroundColor = "gray";
            cajas[i].style.color = "white";
        }
    }

    if (intento === palabra) {
        alert("Respuesta correcta!");
    } else {
        linea++;
        caja = 1;
    }
}


tecladoABC();

palabraSecreta();

matrizLetras();
