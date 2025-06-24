export class BasePlayer {
    constructor(videoElement) {
        if(this.target === BasePlayer){
            throw new Error("BasePlayer is an abstract class and cannot be instantiated directly.");
        }
        this.video = videoElement;
    }
    // This method should be implemented by derived classes to start playback of a stream.
    startPlayback(url) {
        throw new Error("startPlayback(context) method must be implemented in derived classes.");
    }
    reset(){
        throw new Error("startPlayback(context) method must be implemented in derived classes.");
    }
}