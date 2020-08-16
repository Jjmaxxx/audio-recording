let btnSize = 10;
let mic,recorder,soundFile,volumeSlider,button,audioPlayer,dontDownload, videoPlayerSlider,title,credits;
let sliderOn = true;
let state = 0;
let backgroundGraphicObjects = [];
let overVideoPlayer = false;
//let colors = ['black','white', 'gray'];

function setup(){
    createCanvas(windowWidth, windowHeight);
    credits = createA('https://github.com/Jjmaxxx/', 'Created By: Justin Lee');
    credits.position(windowWidth - 305,windowHeight- 29);
    credits.style('color:#00adb5');
    credits.style("font-size:20pt");
    credits.style("width:500px");
    credits.style("-webkit-text-stroke: 0.7px #393e46;");
    credits.style("font-family:verdana");
    button = createButton("Record Mic Input");
    button.center();
    title = createDiv("Audio Recorder");
    title.position(10,0);
    title.style('z-index:2');
    title.style('color:#00adb5');
    title.style("-webkit-text-stroke: 3.3px #393e46;");
    title.style("font-family:verdana");
    title.style("font-size:70pt");
    button.mousePressed(toggleRecording);
    button.style("background-color: #00adb5");
    button.style("border: none");
    button.style("color: white;");
    button.style("padding: 15px 32px;");
    button.style("text-align: center;");
    button.style("text-decoration: none;");
    button.style("display: inline-block;");
    button.style("font-size: 16px;");
    button.style("border-radius: 8px;");
    button.style("transition-duration: 0.4s;");
    button.style('box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);');
    button.mouseOver(function(){button.style("box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);"); button.style("cursor: pointer;")});
    button.mouseOut(function(){button.style("box-shadow:none;")});
    mic = new p5.AudioIn();
    recorder = new p5.SoundRecorder();
    soundFile = new p5.SoundFile();
    for(let i=0; i<50; i++){
        backgroundGraphicObjects.push(new Circle());
    }
}
// myArray[Math.floor(Math.random()*myArray.length)]
function draw(){
  background('#222831');
  backgroundGraphic();
  //console.log(state);
  if(state == 2){
      let vol = mic.getLevel();
      //console.log(vol); 
      //fill(colors[Math.floor(Math.random()*colors.length)]);
      ellipseMode(RADIUS);
      fill("#00adb5");
      ellipse(windowWidth/2,windowHeight/2, vol * 4000, vol * 4000);
      
      ellipseMode(CENTER);
      fill("#393e46");
      ellipse(windowWidth/2,windowHeight/2, vol * 4000, vol * 4000);
    }
    if(videoPlayerSlider != null){
        videoPlayerSlider.changed(function(){soundFile.jump(videoPlayerSlider.value()); overVideoPlayer = false;audioPlayer.html("Pause")});
        if(overVideoPlayer = false){
            setTimeout(function () {
                overVideoPlayer = true;
            }, 2000);
        }else{
            videoPlayerSlider.value(soundFile.currentTime());
        }
  }
}  

function backgroundGraphic(){
    for(let i=0; i<backgroundGraphicObjects.length;i++){
        backgroundGraphicObjects[i].update();
        backgroundGraphicObjects[i].collide();
    }
}
class Circle{
    constructor(){
        this.x = random(0,windowWidth);
        this.y = random(0, windowHeight);
        this.xDir = random(-100,100);
        this.yDir = random(-100,100);
        this.quadrant = 0;
    }
    update(){
        fill("#393e46");
        noStroke();
        noSmooth();
        ellipse(this.x,this.y,5);
        this.x += this.xDir/950;
        this.y += this.yDir/950;
        if(this.x < 0 || this.x > windowWidth){
            this.xDir *= -1;
        }
        if(this.y< 0 || this.y > windowHeight){
            this.yDir *= -1;
        }
        if(this.x < windowWidth/2 && this.y > windowHeight/2){
            this.quadrant = 1;
        }else if(this.x > windowWidth/2 && this.y > windowHeight/2){
            this.quadrant = 2;
        }else if(this.x < windowWidth/2 && this.y < windowHeight/2){
            this.quadrant = 3;;
        }else if(this.x > windowWidth/2 && this.y < windowHeight/2){
            this.quadrant = 4;
        }
    }
    collide(){
        for(let i=0;i< backgroundGraphicObjects.length;i++){
            if(this.quadrant == backgroundGraphicObjects[i].quadrant ){
                if(sqrt(Math.pow(backgroundGraphicObjects[i].x - this.x,2) + Math.pow(backgroundGraphicObjects[i].y - this.y,2)) <= 125){
                    stroke("#393e46");
                    strokeWeight(0.7);
                    line(this.x, this.y, backgroundGraphicObjects[i].x, backgroundGraphicObjects[i].y);
                }
            }
        }
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    button.position(windowWidth/2 - 150, windowHeight/2 - 24);
    title.position(10,0);
    credits.position(windowWidth - 305,windowHeight- 29);
    if(state == 2){
        button.position(windowWidth/2 - 123,windowHeight - 60);
    }
    else if(state == 3){
        if(volumeSlider != null){
            volumeSlider.position(windowWidth/2 + 320,windowHeight/2 + 200);
        }
        audioPlayer.position(windowWidth/2 - 120, windowHeight/2 + 50);
        dontDownload.position(windowWidth/2 + 20, windowHeight/2 - 24);
        if(videoPlayerSlider != null){
            videoPlayerSlider.position(windowWidth/2 - 400,windowHeight/2 + 150);
        }
        console.log('a');
    }
}
function toggleRecording(){
    userStartAudio();
    if(state == 0){
        mic.start();
        recorder.setInput(mic);
        state++;
    }  
    else if(state == 1 && mic.enabled){
        recorder.record(soundFile);
        button.html('Recording! Press to Stop.');
        button.position(windowWidth/2 - 130,windowHeight - 60);
        button.style('width:250px');
        //micEnabled(mic);
        state++;
    }else if(state == 2){
        recorder.stop();
        button.center();
        console.log(soundFile.duration());
        button.style("width:200px;");

        audioPlayer = createButton("Play");
        //audioPlayer.center();
        //audioPlayer.style('padding-top:50px;')
        audioPlayer.style("background-color: #00adb5");
        audioPlayer.style("border: none");
        audioPlayer.style("width: 240px");
        audioPlayer.style("color: white;");
        audioPlayer.style("padding: 15px 32px;");
        audioPlayer.style("text-align: center;");
        audioPlayer.style("text-decoration: none;");
        audioPlayer.style("display: inline-block;");
        audioPlayer.style("font-size: 16px;");
        audioPlayer.style("border-radius: 8px;");
        audioPlayer.style("transition-duration: 0.4s;");
        audioPlayer.style('box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);');
        audioPlayer.mouseOver(function(){audioPlayer.style("box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);"); audioPlayer.style("cursor: pointer;")});
        audioPlayer.mouseOut(function(){audioPlayer.style("box-shadow:none")});
        audioPlayer.position(windowWidth/2 - 120, windowHeight/2 + 50);

        dontDownload = createButton("Record Again");
        dontDownload.mousePressed(recordAgain);
        dontDownload.style("background-color: #00adb5");
        dontDownload.style("border: none");
        dontDownload.style("color: white;");
        dontDownload.style("padding: 15px 32px;");
        dontDownload.style("text-align: center;");
        dontDownload.style("text-decoration: none;");
        dontDownload.style("display: inline-block;");
        dontDownload.style("font-size: 16px;");
        dontDownload.style("width:200px;");
        dontDownload.style("border-radius: 8px;");
        dontDownload.style("transition-duration: 0.4s;");
        dontDownload.style('box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);');
        dontDownload.mouseOver(function(){dontDownload.style("box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);"); dontDownload.style("cursor: pointer;")});
        dontDownload.mouseOut(function(){dontDownload.style("box-shadow:none")});
        dontDownload.position(windowWidth/2 + 20, windowHeight/2 - 24);
        // textSize(30);
        // text("or", windowWidth/2 + 160, windowHeight/2 - 12);
        // fill(255,255,255);
        audioPlayer.mousePressed(toggleAudio);
        button.html('Download Audio');
        button.position(windowWidth/2 - 200, windowHeight/2 - 24);
        state++;
    }else if(state == 3){
        button.center();
        button.style('width:200px');
        button.html("Record Mic Input");
        save(soundFile,"myRecording.wav");
        audioPlayer.remove();
        dontDownload.remove();
        if(volumeSlider != null){
            volumeSlider.remove();
        }
        if(videoPlayerSlider != null){
            videoPlayerSlider.remove();            
        }
        sliderOn = true;
        state = 1;
    }
}
function recordAgain(){
    state = 1;
    button.center();
    button.html('Record Mic Input');
    button.style('width:200px');
    audioPlayer.remove();
    dontDownload.remove();
    volumeSlider.remove();
    videoPlayerSlider.remove();
    sliderOn = true;
}
// function micEnabled(mic){
    
// }
function toggleAudio(){
    audioPlayer.html('Play');
    if(!soundFile.isPlaying()){
        soundFile.play();
        audioPlayer.html('Pause');
        if(sliderOn){
          videoPlayerSlider = createSlider(0, Math.floor(soundFile.duration()), 0, 0.01);
          videoPlayerSlider.style('background-color: #00adb5');
          videoPlayerSlider.style('width', '800px');
          videoPlayerSlider.style('border-radius: 5px;');
          videoPlayerSlider.style("transition-duration: 0.4s;");
          videoPlayerSlider.position(windowWidth/2 - 400,windowHeight/2 + 150);

          volumeSlider = createSlider(0, 2, 1.5, 0.01);
          volumeSlider.position(windowWidth/2 + 320,windowHeight/2 + 200);
          volumeSlider.style('background-color: #00adb5');
          volumeSlider.style("transition-duration: 0.4s;");
          volumeSlider.style('width', '80px');
          sliderOn = false;
        }
        volumeSlider.changed(function(){soundFile.setVolume(volumeSlider.value())});  
    }
    else{
        soundFile.pause();
        audioPlayer.html('Play');
        //soundFile.setVolume(volumeSlider.value());
    }
  soundFile.onended(changeText);
}
function changeText(){
    audioPlayer.html('Play');
    //console.log('a');
}