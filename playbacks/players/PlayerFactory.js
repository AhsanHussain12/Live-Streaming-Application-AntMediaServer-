import { LLHLSPlayer } from "./LLHLSPlayer.js";
import { DASHPlayer } from "./DASHPlayer.js";
// import { WebRTCPlayer } from "./WebRTCPlayer.js";

export class PlayerFactory {
  static createPlayer(type, videoElement) {
    switch (type) {
      case "hls":
        return new LLHLSPlayer(videoElement);
      case "dash":
        return new DASHPlayer(videoElement);
      // case "webrtc":
      //   return new WebRTCPlayer(videoElement);
      default:
        throw new Error("Unknown player type: " + type);
    }
  }
}
