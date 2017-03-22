window.addEventListener('load', function(){ 
    socket = io();
    socket.on('msg', function(data){
        getParametersToDraw(data.x, data.y, data.color, data.size);
    });
    init();

}, false);

var canvas, context, color, size;

function init(){
    $('.colors > li > a').on('click', function(){
        var color = $(this).data('color');
        localStorage.color = color;
    });
    $('#maxValue').on('input', function(){
        size = $(this).val();
        localStorage.size = size;
    }); 

    canvas = document.getElementById("canvas");
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    context = canvas.getContext("2d");
    setValues();
    addListeners();
}

function sendParametersToDraw(x, y, color, size){    
    socket.emit('event_mouse', {x: x, y: y, color: color, size: size});
    socket.on('msg', function(data){
        getParametersToDraw(data.x, data.y, data.color, data.size);
    });
}

function getParametersToDraw(x, y, color, size){
    context.beginPath();
    context.fillStyle = color;
    var _radio = 1 + Math.ceil(Math.random() * size);
    var _desvX = 1 + Math.ceil(Math.random() * size);
    var _desvY = 1 + Math.ceil(Math.random() * size);
    context.arc(x + _desvX, y + _desvY, _radio, 0, Math.PI * 2);
    context.fill();
}

function addListeners(){
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("touchstart", touchDown, false);
}

function mouseDown(e){
    setValues();
    canvas.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("mouseup", mouseUp, false);

    sendParametersToDraw(e.layerX, e.layerY, color, size);
}

function mouseMove(e){
    setValues();
    sendParametersToDraw(e.layerX, e.layerY, color, size);
}

function mouseUp(e){
    canvas.removeEventListener("mousemove", mouseMove, false);
    document.removeEventListener("mouseup", mouseUp, false);
}


function touchDown(e){
    canvas.addEventListener("touchmove", touchMove, false);
    canvas.addEventListener("touchend", touchUp, false);
    document.addEventListener("touchcancel", touchUp, false);
}

function touchMove(e){
    setValues();
    sendParametersToDraw(e.layerX, e.layerY, color, size);
}

function touchUp(e){
    canvas.removeEventListener("mousemove", mouseMove, false);
    document.removeEventListener("mouseup", mouseUp, false);
}

function setValues() {
    
    if(localStorage.color){
        color = localStorage.color;
    }
    else{
        color = "red";    
    }

    if(localStorage.size) {
        size = localStorage.size;
    }
    else{
        size = 10;
    }
 }
