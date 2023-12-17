
audio_1 = "";
audio_2 = '';
left_wrist_X= 0;
right_wrist_X=0;
left_wrist_Y= 0;
right_wrist_Y=0;
score_leftwrist = 0;
score_rightwrist = 0;
status_song1 = "";
status_song2 = "";


function preload(){
    audio_1 = loadSound("paan.mp3")
    audio_2 = loadSound('dharmendra.mp3')

}

function play_song(){

    audio_1.play()
    audio_1.setVolume(0.5)
    audio_1.rate(1)

}


function setup(){
canvas = createCanvas(600,500);
canvas.center()
webcam = createCapture(VIDEO)
webcam.hide()
poseNet = ml5.poseNet(webcam,modelLoaded)
poseNet.on('pose',gotResults)

}
function gotResults(results){

    if(results.length>0){
        console.log(results);
        left_wrist_X=results[0].pose.leftWrist.x
        right_wrist_X=results[0].pose.rightWrist.x
        left_wrist_Y=results[0].pose.leftWrist.y
        right_wrist_Y=results[0].pose.rightWrist.y
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;
    }
    
    }
    function modelLoaded(){
        console.log('modelLoaded')
    }
    


function draw(){
 image(webcam,0,0,600,500)
 //image(variable name,x,y,width,height)
 status_song2= audio_2.isPlaying()
 status_song1= audio_1.isPlaying()
  
   
 if(score_rightwrist>0.2){
    circle(right_wrist_X,right_wrist_Y,25)
    audio_1.stop()
    if(status_song2 == false){
        audio_2.play()
        document.getElementById("song_played").innerHTML= "PLAYING JAT YAMLA PAGLA DEWANA "
    }
 }
 if(score_leftwrist>0.2){
    circle(left_wrist_X,left_wrist_Y,25)
    audio_2.stop()
    if(status_song1 == false){
     audio_1.play()
     document.getElementById("song_played").innerHTML= "PLAYING KHAIKE PAAN BANARAS WALA "
    }
   
   
 }
}


