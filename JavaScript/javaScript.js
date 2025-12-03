// alert("Bienvenido a mi pagina web!"); // Ventana modal
/*let name = prompt("Como te llamas?"); // Ventana con caja de texto
console.log(name);
let color = prompt("Qual tu color favorito?"); // Ventana con caja de texto
console.log(color);*/

function ej1() {
    for (let i = 0; i <= 10; i++) {
        console.log(i);
    }
}

function ej2() {
    let n = Number(prompt("Selecciona un numero:"));
    let suma = 0;
    for (let i = 1; i <= n; i++) {
        suma = suma + i;
        console.log(suma);
    }
}

function ej3() {
    let inicio = Number(prompt("Introduce el inicio del rango:"));
    let fin = Number(prompt("Introduce el fin del rango:"));

    for (let i = inicio; i <= fin; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
}

function ej4() {
    let n = Number(prompt("Introduce la altura del triángulo:"));

    for (let i = 1; i <= n; i++) {
        let linea = "*".repeat(i);
        console.log(linea);
    }
}

function ej5() {
    let n = Number(prompt("Introduce la altura del árbol:"));

    let espaciosP = " ".repeat(n - 1);
    console.log(espaciosP + "+");

    for (let i = 2; i <= n; i++) {
        let espacios = " ".repeat(n - i);       
        let estrellas = "*".repeat(2 * i - 1);  
        console.log(espacios + estrellas);
    }

    let tronco = " ".repeat(n - 1) + "||";
    console.log(tronco);
}


function numeroPrimo() {
    let initN = prompt("Selecciona un numero inicial");
    console.log("Numero inicial: " + initN);
    let andN = prompt("Selecciona un numero final");
    console.log("Numero final: " + andN)

    if (initN > 0 && andN > initN && andN > 0) {
        for (i = initN; i <= andN; i++) {
            if (i % 2 !== 0 && i % 3 !== 0 && i % 5 !== 0 || i == 2 || i == 3 || i == 5 && i !== 1) {
                console.log(i);
            }
        }
    } else {
        alert("Rango erroneo");
        console.error("Rango erroneo");
    }
}

function numeroSecret() {
    const numeroSecreto = Math.floor(Math.random() * 100) + 1;
    console.log("Numero secreto: " + numeroSecreto);

    let guestNumber = Number(prompt("Intenta adivinar un numero entre 1 hasta 100."));

    let intentas = 1;

    for (let i = intentas; i <= 100; i++) {

        if (numeroSecreto > guestNumber) {
            guestNumber = prompt("El numero es mayor. Intenta adivinar de nuevo.");
        } else if (numeroSecreto < guestNumber) {
            guestNumber = prompt("El numero es menor. Intenta adivinar de nuevo.");
        } else {
            alert("Has adivinado el numero! Tienes " + intentas + " intentas.");
            //document.getElementById("textAnswer").innerHTML = "Has adivinado el numero! Tienes " + intentas + " intentas.";
        }
       
        intentas++;
    }

    if (intentas > 100) {
        alert("Has hecho demasiado intentas, por eso pierdas en el juego :(");
        alert("Pero yo creo en ti!");
    }
}

numeroSecret();