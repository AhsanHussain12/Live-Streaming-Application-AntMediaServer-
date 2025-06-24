export const STREAM_MODES = {
  VIDEO_AUDIO: "video_audio",
  AUDIO_ONLY: "audio_only",
  SCREEN_SHARE: "screen_share",
};

function getSilentAudioTrack() {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  return dst.stream.getAudioTracks()[0];
}

export async function getMediaStream(mode, videoElementId) {
    let stream = null;
    try {
        switch (mode) {
            case STREAM_MODES.VIDEO_AUDIO:
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                break;

            case STREAM_MODES.AUDIO_ONLY:
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                break;

            case STREAM_MODES.SCREEN_SHARE:
                stream = await navigator.mediaDevices.getDisplayMedia({ video: true , audio: true });                
                if (stream.getAudioTracks().length === 0) {
                    const silentAudio = getSilentAudioTrack();
                    stream.addTrack(silentAudio);
                    console.warn("🔇 Added silent audio track to screen share");
                }
                break;
                
            default:
                throw new Error("Invalid stream mode");
                
        }
        if (videoElementId) {
            const videoElement = document.getElementById(videoElementId);
            if (videoElement) {
                videoElement.srcObject = stream;
                return stream;
            }
        }

    } catch (error) {
        console.error("Error getting media stream:", error);
        throw error;
    }

}