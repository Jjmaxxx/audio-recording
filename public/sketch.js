let btnSize = 10;
let mic,recorder,soundFile,volumeSlider,button,audioPlayer,dontDownload, videoPlayerSlider;
let sliderOn = true;
let state = 0;
let backgroundGraphicObjects = [];
//let colors = ['black','white', 'gray'];
function setup(){
    createCanvas(windowWidth, windowHeight);
    button = createButton("Record Mic Input");
    button.center();
    //button.position(windowWidth/2,windowHeight/2 - 10);
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
  textSize(50);
  fill("#393e46");
  text("Audio Recording Website",10,50);
  backgroundGraphic();
  //console.log(state);
  if(state == 2){
      let vol = mic.getLevel();
      //console.log(vol); 
      //fill(colors[Math.floor(Math.random()*colors.length)]);
      ellipseMode(RADIUS);
      fill("#00adb5");
      ellipse(windowWidth/2,windowHeight/2, vol * 5000, vol * 5000);
      
      ellipseMode(CENTER);
      fill("#393e46");
      ellipse(windowWidth/2,windowHeight/2, vol * 3000, vol * 3000);
    }
  if(state == 3 && soundFile.isPlaying()){
    // if(videoPlayerSlider.value() != soundFile.currentTime()){
    //   soundFile.jump(videoPlayerSlider.value());
    // }
    videoPlayerSlider.changed(soundFileJump);
    videoPlayerSlider.value(soundFile.currentTime());
  }
  console.log(sliderOn);
}
function soundFileJump(){
    soundFile.jump(videoPlayerSlider.value());
}
function backgroundGraphic(){
    for(let i=0; i<backgroundGraphicObjects.length;i++){
        backgroundGraphicObjects[i].update();
    }
}
class Circle{
    constructor(){
        this.x = random(0,windowWidth);
        this.y = random(0, windowHeight);
        this.xDir = random(-100,100);
        this.yDir = random(-100,100);
    }
    update(){
        fill("#393e46");
        noStroke();
        noSmooth();
        ellipse(this.x,this.y,5);
        this.x += this.xDir/1000;
        this.y += this.yDir/1000;
        if(this.x < 0 || this.x > windowWidth){
            this.xDir *= -1;
        }
        if(this.y< 0 || this.y > windowHeight){
            this.yDir *= -1;
        }
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    button.position(windowWidth/2 - 200, windowHeight/2 - 24);
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
        soundFile.setVolume(volumeSlider.value());
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