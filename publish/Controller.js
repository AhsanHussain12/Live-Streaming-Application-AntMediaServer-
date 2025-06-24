export  class Controller {
    constructor(publisher){
        this.publisher = publisher;
    }

    start(){
        this.publisher.startStreaming();
    }
    stop(btn){
        this.publisher.stopStreaming();
    }
}
