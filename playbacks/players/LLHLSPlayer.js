import { BasePlayer } from "./BasePlayer.js";

export class LLHLSPlayer extends BasePlayer {
  constructor(videoElement) {
    super(videoElement);
    this.hlsPlayer = null;
  }

  async startPlayback(hlsUrl) {
    try {
      const res = await fetch(hlsUrl, { method: "HEAD" });
      if (!res.ok) throw new Error("Stream not found");

      if (this.hlsPlayer) this.reset();

      this.hlsPlayer = new Hls({ lowLatencyMode: true });
      this.hlsPlayer.loadSource(hlsUrl);
      this.hlsPlayer.attachMedia(this.video);
      this.hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => this.video.play());
      this.hlsPlayer.on(Hls.Events.ERROR, ()=> handleError);
    } catch (err) {
      // handle errrors properly
      console.error("HLS Playback Error:", err);
    }
  }

  reset() {
    if (this.hlsPlayer) {
      this.hlsPlayer.destroy();
      this.hlsPlayer = null;
    }
  }

  handleError(event, data) {
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          console.error("Network error encountered:", data);
          this.hlsPlayer.startLoad(); // Attempt to recover by restarting the load
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          console.error("Media error encountered:", data);
          this.hlsPlayer.recoverMediaError(); // Attempt to recover from media error
          break;
        default:
          console.error("Other error encountered:", data);
          this.hlsPlayer.reset(); // Reset the player for any other fatal errors
          break;
        
      }
    }
  }
}
