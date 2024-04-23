estatus = false
lista = []

function setup() {
    canvas = createCanvas(500, 300)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    detectorobjetos = ml5.objectDetector("cocossd", modelLoaded)
}
function draw() {
    image(video, 0, 0, width, height)
    if(estatus == true) {
        video.size(width, height)
        detectorobjetos.detect(video, Respuestas)
        listamista = []
        for(i = 0; i < lista.length; i ++) {
            obj = lista[i]
            porcentaje = round(obj.confidence*100)
            stroke("red")
            strokeWeight(5)
            noFill()
            rect(obj.x, obj.y, obj.width, obj.height)
            noStroke()
            fill("black")
            textSize(15)
            textStyle(BOLD)
            text(obj.label + " " + porcentaje + "%", obj.x, obj.y + 10)
            if(!listamista.includes(obj.label)) {
                listamista.push(obj.label)
            }
        }
        document.getElementById("status").innerHTML = lista.length + " objetos detectados"
        document.getElementById("esmatus").innerHTML = " objetos detectados: " + listamista 
    }
}
function modelLoaded() {
    console.log("Cargo cocossd")
    estatus = true
}
function Respuestas(error, resultados) {
    if(error) {
        console.error("ERROR")
    } else {
        console.log(resultados)
        lista = resultados
    }
}