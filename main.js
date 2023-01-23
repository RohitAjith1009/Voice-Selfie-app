var SpeechRecognition = window.webkitSpeechRecognition;
recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function (event) {
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if(content=="take my selfie"){
        speak();
        Webcam.attach(camera);
        setTimeout(function(){
            take_snapshot();
            save();
        },5000);
        
    }
    
}
function speak() {
    synth = window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds";
    utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        console.log("taking snapshot");
        document.getElementById("result").innerHTML = "<img id='snapshot' src='" + data_uri + "'/>";

    });
}

function save(){
    link=document.getElementById("link");
    img=document.getElementById("snapshot").src;
    link.href=img;
    link.click();
}