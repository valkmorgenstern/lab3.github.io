"use strict";

var canvasWidth = 840;
var canvasHeight = 640;

var imageWidth = 420;
var imageHeight = 320;

var canvas = document.createElement("canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;


// var generateText = document.createElement("p");
// generateText.innerText = "Generate";
//
// var newButton = document.createElement('button');
// newButton.setAttribute('onclick', draw());
// newButton.setAttribute("style", "margin-right: 15px")
// newButton.appendChild(generateText);

var body = document.getElementsByTagName('body')[0];

body.appendChild(canvas);
// body.appendChild(newButton);


function text() {
    var url = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var myText = xhr.responseText;
                console.log(myText);
                console.log(typeof myText);
                var quote = myText.split('\"')[3];
                console.log(quote);
            }
            else throw new Error("Request failed");
        }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}


var ctx = canvas.getContext('2d');

function draw() {

    ctx.strokeRect(0, 0, 840, 640);

    var image1 = new Image();
    image1.src = 'https://source.unsplash.com/collection/762960/420x320';
    image1.onload = function () {
        ctx.drawImage(image1, 0, 0);
    };

    var image2 = new Image();
    image2.src = 'https://source.unsplash.com/collection/2446638/420x320';
    image2.onload = function () {
        ctx.drawImage(image2, imageWidth, 0);
    };

    var image3 = new Image();
    image3.src = 'https://source.unsplash.com/collection/162326/420x320';
    image3.onload = function () {
        ctx.drawImage(image3, 0, imageHeight);
    };

    var image4 = new Image();
    image4.src = 'https://source.unsplash.com/collection/1254524/420x320';
    image4.onload = function () {
        ctx.drawImage(image4, imageWidth, imageHeight);
    }

}

draw();
text();