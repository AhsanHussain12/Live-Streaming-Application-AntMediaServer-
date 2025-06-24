import { AntMediaPublisher } from "./publish/AntMediaPublisher.js";
import { Controller} from "./publish/Controller.js";

document.addEventListener("DOMContentLoaded", () => {

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const streamIdInput = document.getElementById("streamIdInput");
const modeSelect = document.getElementById("modeSelect");
const serverUrl = "ws://localhost:5080/LiveApp/websocket";
let streamId ;
let mode = modeSelect.value; 
let controller = null;

stopBtn.disabled = true;

streamIdInput.addEventListener("input", () => {
    streamId = streamIdInput.value.trim();
    const isValid = streamId !== "";
    startBtn.disabled = !isValid;

});

modeSelect.addEventListener("change", () => {
    mode = modeSelect.value;
});



startBtn.addEventListener("click",()=> {
  if(streamId && mode){
    controller = new Controller(new AntMediaPublisher(serverUrl, "localVideo",streamId, mode,startBtn,stopBtn));
    controller.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }  
})

stopBtn.addEventListener("click", ()=> {
    if(controller){
        controller.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
})

})

