"use strict";

var canvasWidth = 840;
var canvasHeight = 640;

var imageWidth = 420;
var imageHeight = 320;

var canvas = document.createElement("canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var saveText = document.createElement("p");
saveText.innerText = "Save";

var saveButton = document.createElement("button");
saveButton.appendChild(saveText);

var saveButtonLink = document.createElement("a");
saveButtonLink.setAttribute("id", "download");
saveButtonLink.setAttribute("download", "collage.jpg");
saveButtonLink.setAttribute("href", "");
saveButtonLink.appendChild(saveButton);

var body = document.getElementsByTagName('body')[0];
body.appendChild(canvas);
body.appendChild(saveButtonLink);

var ctx = canvas.getContext('2d');

var padding = 10, fontSize = 30;

// ctx.textAlign = 'center';
ctx.font = fontSize + 'px Luminari';
ctx.fillStyle = 'white';

var resultImage = null;

function drawText() {

    var quoteStrings = [];
    var arrQuote = quote.split(" ");
    var pointer = 0;
    for (var i = 0; i < arrQuote.length; i++) {
            if (ctx.measureText(arrQuote.slice(pointer, i + 1).join(" ")).width >= canvas.width - 2 * padding) {
                quoteStrings.push(arrQuote.slice(pointer, i).join(" "));
                pointer = i;
            }
        }
    quoteStrings.push(arrQuote.slice(pointer, arrQuote.length).join(" "));

    for (var i = 0; i < quoteStrings.length; i++) {
        ctx.fillText(quoteStrings[i],
                (canvas.width - ctx.measureText(quoteStrings[i]).width)/2,
                (canvas.height - 2 * padding - fontSize * quoteStrings.length) / 2 + fontSize * (i + 1.2));
        }

    resultImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    saveButtonLink.href = resultImage;

}

function text() {

    var url = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var myText = xhr.responseText;
                console.log(myText);
                quote = myText.split('\"')[3];
                drawText();
            }
            else throw new Error("Request failed");
        }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}

var imageUrl1 = 'https://source.unsplash.com/collection/762960/420x320';
var imageUrl2 = 'https://source.unsplash.com/collection/2446638/420x320';
var imageUrl3 = 'https://source.unsplash.com/collection/162326/420x320';
var imageUrl4 = 'https://source.unsplash.com/collection/1254524/420x320';
var sources = [imageUrl1, imageUrl2, imageUrl3, imageUrl4];


function draw(imageSources, callback) {

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    var images = new Array(4);

    for (var i = 0; i < 4; i++) {
        images[i] = new Image();
        images[i].src = imageSources[i];
        images[i].setAttribute('crossOrigin', 'anonymous');
    }
        var counter = 0;
        images[0].onload = images[1].onload = images[2].onload = images[3].onload = function () {
            counter++;
            if (counter == 4) {
                ctx.drawImage(images[0], 0, 0);
                ctx.drawImage(images[1], imageWidth, 0);
                ctx.drawImage(images[2], 0, imageHeight);
                ctx.drawImage(images[3], imageWidth, imageHeight);
                callback();
            }
        };

}


var quote = null;


draw(sources, text);