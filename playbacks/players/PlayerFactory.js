import { LLHLSPlayer } from "./LLHLSPlayer.js";
import { DASHPlayer } from "./DASHPlayer.js";


export class PlayerFactory {
  static createPlayer(type, videoElement) {
    switch (type) {
      case "hls":
        return new LLHLSPlayer(videoElement);
      case "dash":
        return new DASHPlayer(videoElement);
      default:
        throw new Error("Unknown player type: " + type);
    }
  }
}
