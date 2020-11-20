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
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 400);
        ctx.closePath();
        ctx.stroke();
    }
}

const numOfRings = 1;
let ringsArr;

function init() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

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