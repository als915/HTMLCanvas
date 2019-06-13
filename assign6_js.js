var canvas1 = document.getElementById('c1');
var canvas2 = document.getElementById('c2');
var canvas3 = document.getElementById('c3');

var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');

let video = document.querySelector('video');
  
let width;
let height;

let color = 0;

function setup() {
//Canvas 1
  // fixed canvas size
  width = canvas1.width;
  height = canvas1.height;

  // set the CSS display size
  canvas1.style.width = width + 'px';
  canvas1.style.height = height + 'px';

  // set the number of display pixels, scaled for device resolution
  var scale = window.devicePixelRatio;
  canvas1.width = width * scale;
  canvas1.height = height * scale;

  // normalize the coordinate system
  ctx1.scale(scale, scale);

//Canvas 2
  // fixed canvas size
  width = canvas2.width;
  height = canvas2.height;

  // set the CSS display size
  canvas2.style.width = width + 'px';
  canvas2.style.height = height + 'px';

  // set the number of display pixels, scaled for device resolution
  var scale = window.devicePixelRatio;
  canvas2.width = width * scale;
  canvas2.height = height * scale;

  // normalize the coordinate system
  ctx2.scale(scale, scale);

//Canvas 3
   // fixed canvas size
  width = canvas3.width;
  height = canvas3.height;

  // set the CSS display size
  canvas3.style.width = width + 'px';
  canvas3.style.height = height + 'px';

  // set the number of display pixels, scaled for device resolution
  var scale = window.devicePixelRatio;
  canvas3.width = width * scale;
  canvas3.height = height * scale;

  // normalize the coordinate system
  ctx3.scale(scale, scale);
}

function drawSulfur() {
  ctx1.beginPath();
  ctx1.moveTo(200, 200);
  ctx1.lineTo(300, 50);
  ctx1.lineTo(400, 200);
  ctx1.lineTo(200,200);
  ctx1.lineTo(300, 50);
  ctx1.moveTo(300, 200);
  ctx1.lineTo(300, 375);
  ctx1.moveTo(215, 287.5);
  ctx1.lineTo(375, 287.5);
  ctx1.closePath();
  ctx1.lineWidth = 5; 
}

function drawZinc(){
  ctx2.beginPath();
  ctx2.ellipse(300, 200, 100, 100, 0, 0, 2 * Math.PI, false);
  ctx2.moveTo(100,200);
  ctx2.lineTo(300, 25); 
  ctx2.lineTo(500, 200);
  ctx2.lineTo(300, 25);
  ctx2.lineTo(100,200); 
  ctx2.closePath();
  ctx2.lineWidth = 5;
}
let toggle = false; 

function drawVideo() {
  toggle = !toggle; 
  if (toggle){
    ctx3.drawImage(video, 25, 25, 550, 350);

    let imageData = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);
    let data = imageData.data; 
    
    for(i = 0; i < data.length; i += 4){
      data[i] = data[i + (canvas3.width * 4 / 2)]; // 1200
      data[i + 1] = 255 - data[i + 1]; //green
    }
    ctx3.putImageData(imageData, 0, 0);
  }

  requestAnimationFrame(drawVideo); 
}

function animation(){
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  
  let drawing1 = drawSulfur();
  let drawing2 = drawZinc();

  ctx1.fillStyle = 'hsla(' + color + ', 100%, 50%, 0.6)';
  ctx2.fillStyle = 'hsla(' + color + ', 100%, 50%, 0.6)';
  
  ctx1.strokeStyle = 'hsla(' + color + ', 100%, 50%, 0.6)';
  ctx2.strokeStyle = 'hsla(' + color + ', 100%, 50%, 0.6)';
  
  ctx1.globalCompositeOperation = 'lighten';
  ctx2.globalCompositeOperation = 'hard light';
  ctx1.save();
  ctx2.save();

  ctx1.fill(drawing1);
  ctx2.fill(drawing2);
  ctx1.stroke();
  ctx2.stroke(); 

  ctx1.restore();
  ctx2.restore();

  if(color >= 360){
    color = 0; 
  }
  color += 0.5; 
  requestAnimationFrame(animation);
};


video.addEventListener('play', drawVideo);
       
setup();
animation();
      
window.addEventListener('resize', function(){
  setup();
  animation();
}); 