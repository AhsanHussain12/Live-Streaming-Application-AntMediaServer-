import { WebRTCAdaptor } from "https://esm.sh/@antmedia/webrtc_adaptor@2.14.0";
import { getMediaStream } from "./media/MediaManager.js";
import { Publisher } from "./BasePublisher.js";

export class AntMediaPublisher extends Publisher {
    constructor(serverUrl, videoElementId , streamId , mode, startBtn, stopBtn) {
        super();
        this.serverUrl = serverUrl;
        this.videoElementId = videoElementId;
        this.adaptor = null;
        this.streamId = streamId;
        this.mode = mode;
        this.startBtn = startBtn;
        this.stopBtn = stopBtn;
    }


    async startStreaming() {

        if(!this.adaptor) {
            try {
                const mediaStream = await getMediaStream(this.mode, this.videoElementId);
                this.adaptor = new WebRTCAdaptor({
                    websocket_url: this.serverUrl,
                    mediaConstraints: null ,
                    isPlayMode: false, // false for publishing
                    localStream: mediaStream,
                    callback: async(info) => {
                        if (info === "initialized") {
                            console.log("Stream Started",this.streamId);
                            this.adaptor.publish(this.streamId);
                        }
                        if (info === "publish_started") {
                            console.log("Publishing started for stream:", this.streamId);
                        }
                        if (info === "publish_finished") {
                            console.log("Publishing stopped for stream:", this.streamId);
                        }
                    },
                    callbackError: (error, message) => {
                        if (error === "notFoundError" || error === "DevicesNotFoundError") {
                        alert("No camera/microphone found. Please check your device.");
                        } else if (error === "streamIdInUse") {
                        alert("Stream ID already in use. Try a different one.");
                        } else if (error === "WebSocketNotConnected") {
                        alert("Could not connect to the Server");
                        } else {
                        alert("An unexpected error occurred: " + error);
                        }

                        this.stopStreaming();
                    },
                });
            } 
            catch (error) {
                console.error(error);
                if(error.name == "NotFoundError" ){
                    alert("No Camera or Microphone found ");
                }
                this.stopStreaming();
            }

            

        }

    }

    stopStreaming() {
        if (this.adaptor) {
            // Stop the stream and peer connections
            this.adaptor.closeStream(this.adaptor.publishStreamId);
            // Close the WebSocket connection and server streams
            this.adaptor.closeWebSocket(this.adaptor.publishStreamId);

            this.clearVideoTracks()

            this.adaptor = null;

            this.stopBtn.disabled = true;
            this.startBtn.disabled = false;
        }
    }

    clearVideoTracks() {
        const videoElement = document.getElementById("localVideo");
        if(videoElement.srcObject){
            const tracks=videoElement.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject=null;
        }
    }

}