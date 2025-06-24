import { BasePlayer } from "./BasePlayer.js";

export class DASHPlayer extends BasePlayer {
  constructor(videoElement) {
    super(videoElement);
    this.dash = null;
    this.retryCount = 0;
    this.MAX_RETRIES = 50; 
  }

  async startPlayback(dashUrl) {

    if (this.dash) this.dash.reset();

    this.dash = dashjs.MediaPlayer().create();
    
    this.dash.initialize(this.video, dashUrl, true);

    
  }

  reset() {
    if (this.dash) {
      this.dash.reset();
      this.dash = null;
    }
    this.retryCount = 0;
  }

  handleError(){
    this.dash.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      const errorObj = e?.error;
      if (errorObj?.code === 28) {
        retryCount++;
        if (retryCount >= MAX_RETRIES) {
          this.reset();
        }
      }
    });
  }
}
    