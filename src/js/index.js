import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import Home from "./component/home";

let intevalo = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

function start() {
  if (!intevalo) {
    intevalo = setInterval(() => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
      renderApp();
    }, 1000);
  }
}

function stop() {
  if (intevalo) {
    clearInterval(intevalo);
    intevalo = null;
  }
}

function restart() {
  seconds = 0;
  minutes = 0;
  hours = 0;
  stop();
  renderApp();
}

function resume() {
  if (!intevalo) {
    start(); // Reanuda el temporizador si está detenido.
  }
}

// Función para renderizar la aplicación
function renderApp() {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <Home
      seconds={seconds}
      minutes={minutes}
      hours={hours}
      start={start}
      stop={stop}
      resume={resume}
      restart={restart}
    />
  );
}

renderApp();