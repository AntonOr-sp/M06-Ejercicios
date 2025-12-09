tecladoNumerico();

function eje1(){
    document.getElementById("titulo").innerHTML="Título actualizado";
    document.getElementById("parrafo").innerHTML="Texto actualizado";
    console.log("Todo actualizado");
}

function eje2(){
    let mascota = document.getElementById("mascota");
    mascota.src ="Media/rana1.jpg"
    document.getElementById("description").textContent="Imagen actualizada";
}

function eje3(){
    //ElementHTML document.createElement()
    let parrafo = document.createElement("p");
    parrafo.textContent ="Este es un párrafo añadido"
    document.getElementById("contenedor").appendChild(parrafo);
}

function tecladoNumerico(){
    let valueNumbers = 4;

    let teclado = document.getElementById("teclado");


    for(let i = 1; i<valueNumbers ;i++){
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>"+i+"</p>";
        tecla.className = "tecla";

        teclado.appendChild(tecla);
    }
}