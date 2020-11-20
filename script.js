"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

class Ring {
    constructor() {

    }

    update() {
        this.draw();
    }

    draw() {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(centerX + 200, centerY);

        for (let i = 0; i < 360; i++) {
            let currAngleInRadians = (i * Math.PI) / 180;
            let x = centerX + Math.cos(currAngleInRadians) * 200;
            let y = centerY + Math.sin(currAngleInRadians) * 200;

            ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.stroke();
    }
}

const numOfRings = 1;
let ringsArr;
let centerX;
let centerY;

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
})();


window.onresize = init;