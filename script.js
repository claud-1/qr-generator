const inputUrl = document.getElementById("url");
const generarBtn = document.getElementById("generarBtn");
const descargarBtn = document.getElementById("descargarBtn");
const qrContainer = document.getElementById("qrcode");
const mensaje = document.getElementById("mensaje");
const sonidoQR = document.getElementById("sonidoQR");

let qrActual = null;


// Cuando pulsamos "Generar QR"
generarBtn.addEventListener("click", generarQR);


function generarQR() {

    // Eliminar el QR anterior
    qrContainer.innerHTML = "";

    // Desactivar la descarga hasta tener un QR válido
    descargarBtn.disabled = true;

    // Limpiar el mensaje anterior
    mensaje.textContent = "";

    let url = inputUrl.value.trim();


    // Comprobar que se ha escrito algo
    if (!url) {
        mensaje.textContent = "Introduce una dirección web.";
        return;
    }


    // Añadir https:// si el usuario no lo ha escrito
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }


    // Comprobar que la URL es válida
    try {

        new URL(url);

    } catch (error) {

        mensaje.textContent = "La dirección web no es válida.";
        return;
    }


    // Generar el nuevo QR
    qrActual = new QRCode(qrContainer, {
        text: url,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });


    // Activar la descarga
    descargarBtn.disabled = false;

    // Lanzar confeti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: {
            y: 0.6
        }
    });
    // Reproducir sonido
    sonidoQR.currentTime = 0;
    sonidoQR.play();
}


// Descargar el QR como PNG
descargarBtn.addEventListener("click", descargarQR);


function descargarQR() {

    if (!qrActual) {
        return;
    }

    const canvas = qrContainer.querySelector("canvas");
    const imagen = qrContainer.querySelector("img");


    // Caso 1: la librería ha generado un canvas
    if (canvas) {

        const enlace = document.createElement("a");

        enlace.download = "codigo-qr.png";
        enlace.href = canvas.toDataURL("image/png");

        enlace.click();

        return;
    }


    // Caso 2: la librería ha generado una imagen
    if (imagen) {

        const enlace = document.createElement("a");

        enlace.download = "codigo-qr.png";
        enlace.href = imagen.src;

        enlace.click();
    }
}