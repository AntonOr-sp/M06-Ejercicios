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
    let valueNumbers = 50;

    let teclado = document.getElementById("teclado");


    for(let i = 0; i<valueNumbers ;i++){
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>"+i+"</p>";
        tecla.className = "tecla";

        if(i%2 === 0){
            tecla.style.background="blue";
            tecla.style.color="white";
        }

        if(i%3 === 0){
            tecla.style.background="red";
            tecla.style.color="white";
        }

        teclado.appendChild(tecla);
    }
}