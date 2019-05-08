// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var capture;
var tracker
var w = 640, h = 480;
var face = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var browL = [15, 16, 17, 18];
var browR = [19, 20, 21, 22];
var eyeR = [23, 63, 24, 64, 25, 65, 26, 66, 23];
var pupilR = 27;
var eyeL = [30, 68, 29, 67, 28, 70, 31, 69];
var pupilL = 32;
var noseV = [33, 41, 62];
var noseW = [34, 35, 36, 42, 37, 43, 38, 39, 40];
var mouthWR = 44;
var mouthWL = 50;
var uppLipUp = [mouthWR, 45, 46, 47, 48, 49, mouthWL];
var uppLipBot = [mouthWR, 61, 60, 59, mouthWL];
var botLipUp = [mouthWR, 56, 57, 58, mouthWL];
var botLipBot = [mouthWR, 55, 54, 53, 52, 51, mouthWL];

function setup() {
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
  
  colorMode(HSB);
  
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);
  console.log(pModel);
}

/*for (var y = 0; y < h; y += 15) {
    for (var x = 0; x < w; x += 15) {
      var pixVals = ((y*w)+x)*4; //SEEMS CONFUSING AT FIRST, but each pixel has 4 values (RGBA)
      fill(cap.pixels[pixVals], cap.pixels[pixVals+1], cap.pixels[pixVals+2]); // filling each pixel with rgb values 
      rect(x, y, 15, 15);*/


function draw() {
  image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(255,255,255,0);
  
  if (positions.length > 0){
    noStroke();
    for (var i=0; i<positions.length; i++) {
      fill(0, 0, 50, 0.6);
      rect(positions[i][0]-40, positions[i][1]-80, 80, 80);
      
    }
  }
  
  if(positions.length > 0) {
    var mouthLeft = createVector(positions[44][0], positions[44][1]);
    var mouthRight = createVector(positions[50][0], positions[50][1]);
    var smile = mouthLeft.dist(mouthRight);
    //rect(20, 20, smile * 3, 20);
  }
}
