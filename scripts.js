"use strict";

var canvasWidth = 840;
var canvasHeight = 640;

var imageWidth = 420;
var imageHeight = 320;

var canvas = document.createElement("canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;


var body = document.getElementsByTagName('body')[0];

body.appendChild(canvas);

var ctx = canvas.getContext('2d');

function draw() {

    ctx.strokeRect(0,0,840,640);

    var image1 = new Image();
    image1.src = 'https://source.unsplash.com/random/420x320';
    image1.onload = function(){
        ctx.drawImage(image1, 0, 0);
    };

    var image2 = new Image();
    image2.src = 'https://source.unsplash.com/random/420x320';
    image2.onload = function(){
        ctx.drawImage(image2, imageWidth, 0);
    };

    var image3 = new Image();
    image3.src = 'https://source.unsplash.com/random/420x320';
    image3.onload = function(){
        ctx.drawImage(image3, 0, imageHeight);
    };

    var image4 = new Image();
    image4.src = 'https://source.unsplash.com/random/420x320';
    image4.onload = function(){
        ctx.drawImage(image4, imageWidth, imageHeight);
    }

}

draw();