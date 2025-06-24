import { PlayerFactory } from "./players/PlayerFactory.js";

export class PlayerController {
  constructor(videoElement) {
    this.video = videoElement;
    this.currentPlayer = null;
    this.currentType = null;
  }

  setPlayer(type) {
    if (this.currentPlayer && this.currentPlayer.reset) {
      this.currentPlayer.reset(); // Properly cleanup previous player
    }
    this.currentPlayer = PlayerFactory.createPlayer(type, this.video);
    this.currentType = type;
  }

  play(url) {
    this.currentPlayer.startPlayback(url);
  }
}
