export class Publisher {
    constructor(){
        if(new.target === Publisher){
            throw new TypeError("Cannot construct Publisher instances directly, please use a subclass");
        }
    }
    async startStreaming() {
        throw new Error("startStreaming method must be implemented by subclass");
    }
    stopStreaming() {
        throw new Error("stopStreaming method must be implemented by subclass");
    }
}