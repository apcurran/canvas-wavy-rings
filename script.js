"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

// Rings Setup
const numOfRings = 1;
const maxWavesAmplitude = 17;
const numOfWavesPerRing = 7;
const ringRadius = 200;
let ringsArr;
let centerX;
let centerY;
let startAngle = 0;

class Ring {
    update() {
        this.draw();
    }

    draw() {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 8;
        ctx.beginPath();
        
        for (let i = -180; i < 180; i++) {
            let currAngleInRadians = (i + startAngle) * Math.PI / 180;
            let displacement = 0;
            let now = Math.abs(i);
            
            if (now > 70) {
                displacement = (now - 70) / 70;
            }
            
            if (displacement >= 1) {
                displacement = 1
            }
            
            let waveAmplitude = ringRadius + displacement * Math.sin(currAngleInRadians * numOfWavesPerRing) * maxWavesAmplitude;
            let x = centerX + Math.cos(currAngleInRadians) * waveAmplitude;
            let y = centerY + Math.sin(currAngleInRadians) * waveAmplitude;
            
            if (i > -180) {
                ctx.lineTo(x, y);
            } else {
                ctx.moveTo(x, y);
            }
        }

        ctx.closePath();
        ctx.stroke();
    }
}

function init() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    ringsArr = [];

    for (let i = 0; i < numOfRings; i++) {
        ringsArr.push(new Ring());
    }
}

init();

(function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw rings
    for (let i = 0; i < ringsArr.length; i++) {
        ringsArr[i].update();
    }

    startAngle++;
})();


window.onresize = init;