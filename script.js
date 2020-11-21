"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext(`2d`);

let centerX = 0;
let centerY = 0;

function init() {
  canvas.width  = innerWidth;
  canvas.height = innerHeight;
  centerX = canvas.width  / 2;
  centerY = canvas.height / 2;
}

init();

const numberOfRings     = 3;
const ringRadiusOffset  = 7;
const ringRadius        = 200;
const waveOffset        = 15;
const colors            = [`#771111`, `#bb1111`, `#ff1111`];
let startAngle          = 0;

function updateRings() {
  for (let i = 0; i < numberOfRings; i++) {
    let radius = i * ringRadiusOffset + ringRadius;
    let offsetAngle = i * waveOffset * Math.PI / 180;
    
    drawRing(radius, colors[i], offsetAngle);
  }

  startAngle >= 360? startAngle = 0 : startAngle++;
}

const maxWavesAmplitude = 17;
const numberOfWaves     = 7;

function drawRing(radius, color, offsetAngle) {
  ctx.strokeStyle = color;
  ctx.lineWidth   = 9;

  ctx.beginPath();
  
  for (let j = -180; j < 180; j++) {
    let currentAngle  = (j + startAngle) * Math.PI / 180;
    let displacement  = 0;
    let now = Math.abs(j);

    if (now > 70) {
      displacement = (now - 70) / 70;
    }

    if (displacement >= 1) {
      displacement = 1;
    }

    let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
    let x = centerX + Math.cos(currentAngle) * waveAmplitude;
    let y = centerY + Math.sin(currentAngle) * waveAmplitude;

    if (j > -180) {
        ctx.lineTo(x, y);
    } else {
        ctx.moveTo(x, y);
    }
  }

  ctx.closePath();
  ctx.stroke();
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  updateRings();
  requestAnimationFrame(animate);
})();

window.onresize = init;