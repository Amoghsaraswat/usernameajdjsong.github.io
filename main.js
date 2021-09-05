noseX=0;
noseY=0;
difference=0;
leftwristX=0;
rightwristX=0;
function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    canvas = createCanvas(400, 400);
    canvas.position(560, 150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Loaded");
}

function draw() {
    background("white");
    document.getElementById("square").innerHTML="width and height of a square will be "+difference+"px";
    fill("red");
    stroke("red");
    square(noseX,noseY,difference);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
       noseX=results[0].pose.nose.x;
               noseY=results[0].pose.nose.y;
        console.log("noseX = " + noseX +" noseY ="+noseY);
        leftwristX=results[0].pose.leftWrist.x;
        rightwristX=results[0].pose.rightWrist.x;
        difference=floor(leftwristX-rightwristX);
    
    }
}
