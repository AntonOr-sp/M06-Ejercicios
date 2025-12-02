// alert("Bienvenido a mi pagina web!"); // Ventana modal
/*let name = prompt("Como te llamas?"); // Ventana con caja de texto
console.log(name);
let color = prompt("Qual tu color favorito?"); // Ventana con caja de texto
console.log(color);*/

function for1() {
    for (let i = 0; i <= 10; i++) {
        console.log(i);
    }
}

function for2() {
    let N = prompt("Selecciona un numero");
    let suma = 34;
    for (let i = 0; i <= N; i++) {
        suma += i;
        console.log(suma);
    }
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

    let guestNumber = prompt("Intenta adivinar un numero entre 1 hasta 100.");

    let intentas = 0;
    let numeroAdivinado = true;

    /*switch (numeroAdivinado == true) 
        {
        case numeroSecreto == guestNumber:
            alert("Has adivinado el numero! Tienes " + intentas + " intentas.");
            numeroAdivinado = false;
            break;
        case numeroSecreto < guestNumber:
            guestNumber = prompt("El numero es menor. Intenta adivinar de nuevo.");
            intentas++;
            break;
        case numeroSecreto > guestNumber:
            guestNumber = prompt("El numero es mayor. Intenta adivinar de nuevo.");
            intentas++;
            break;
        default:
            alert("Error");
            break;
    }*/

    for (i = intentas; i <= 100; i++) {

        if (numeroSecreto == guestNumber) {
            alert("Has adivinado el numero! Tienes " + intentas + " intentas.");
            document.getElementById("textAnswer").innerHTML = "Has adivinado el numero! Tienes " + intentas + " intentas.";
        } else if (numeroSecreto < guestNumber) {
            guestNumber = prompt("El numero es menor. Intenta adivinar de nuevo.");
        } else if (numeroSecreto > guestNumber) {
            guestNumber = prompt("El numero es mayor. Intenta adivinar de nuevo.");
        } else {
            alert("ERROR");
        }



        intentas = i;
    }

    if (intentas > 100) {
        alert("Has hecho demasiado intentas, por eso pierdas en el juego :(");
        alert("Pero yo creo en ti!");
    }




}

numeroSecret();
