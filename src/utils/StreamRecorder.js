/**
 * Classe para gravar o audio por meio do MediaRecorder do navegador
 */
var StreamRecorder = function () {

    var that = this;
    var audioRecorder = null;
    var recordingData = [];

    this.hasGetUserMedia = function() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    this.getUserMedia = function (options, successCallback, failureCallback) {
        var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (api) {
            return api.bind(navigator)(options, successCallback, failureCallback);
        }

        alert('User Media API not supported.');
    }

    this.startRecord = function () {
        var constraints = {};
        constraints['audio'] = true; //carrega o audio
        this.recordingData  = []; //reinicia o conteúdo do audio

        if(!this.hasGetUserMedia()){
            return false; //não tem suporte a captura
        }

        this.getUserMedia(constraints, function(stream) {
            that.audioRecorder = new MediaRecorder(stream);
            that.audioRecorder.ondataavailable = function(event) {
                that.recordingData.push(event.data);
            }

            that.audioRecorder.start(100);
        }, function(err) {
            alert('Error: ' + err);
        });
    }

    this.stopRecord = function(){
        that.audioRecorder.stop();  
        var blob = new Blob(that.recordingData, { type: 'audio/mp3'});

        return blob;
    }

}

module.exports = StreamRecorder;