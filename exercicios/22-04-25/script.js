
const estaticos = document.getElementById("estaticos");
const context = estaticos.getContext("2d");

context.fillStyle = "black";
context.fillRect(10, 10, estaticos.width, estaticos.height);

const animados = document.getElementById("animados");
const contextAnimados = animados.getContext("2d");

let x = 0;
function animar() {
  contextAnimados.clearRect(0, 0, animados.width, animados.height);
  contextAnimados.fillRect(x, 100, 100, 100);
  x += 0.4;
  requestAnimationFrame(animar);
}
animar();