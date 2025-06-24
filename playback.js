import { StreamSelectorManager } from "./playbacks/StreamSelectorManager.js";
import { PlayerController } from "./playbacks/PLayerController.js";

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("#videoPlayer");
  const streamList = document.getElementById("streamList");
  const streamTypeToggle = document.getElementById("streamTypeToggle");
  const watchBtn = document.getElementById("watchBtn");
  let playbackType = streamTypeToggle.value;

  const controller = new PlayerController(video);
  controller.setPlayer(playbackType);

  streamTypeToggle.addEventListener("change", () => {
    playbackType = streamTypeToggle.value;
    controller.setPlayer(playbackType);
  });

  const selector = new StreamSelectorManager(streamList);
  selector.startPolling();

  watchBtn.addEventListener("click", () => {

    const streamId = selector.getSelectedStream();

    if (!streamId) return alert("Please select a stream.");
    
    const baseUrls = {
      hls: `http://localhost:5080/LiveApp/streams/${streamId}.m3u8`,
      dash: `http://localhost:5080/LiveApp/streams/${streamId}/${streamId}.mpd`,
    };

    switch (playbackType) {
      case "hls":
        console.log("HLS URL:", baseUrls.hls);
        controller.play( baseUrls.hls );
        break;
      case "dash":
        console.log("DASH URL:", baseUrls.dash);
        controller.play( baseUrls.dash );
        break;
    }

  });

});
