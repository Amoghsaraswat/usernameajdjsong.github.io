song="";
leftWristX=0;
leftwristY=0;
rightwristX=0;
    rightwristY=0;
leftwristScore=0;
function preload() {
    song=loadSound("music.mp3");    
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
} 
function draw() {
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if (leftwristScore>0.2) {
        circle(leftWristX,leftwristY,12);
        inNumber=Number(leftwristY);
        decimals=floor(inNumber);
        volume=decimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
        
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log("poseNet is loaded");
}
function gotPoses(results) {
    if(results.length>0) {
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
                rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftwristScore=results[0].pose.keypoints[9].score;
    }
}