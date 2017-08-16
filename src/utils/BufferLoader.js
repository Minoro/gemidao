/**
 * Classe disponível em --> https://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js
 * Faz o request de um audio como arraybuffer, decodifica e insere em um array. Ao terminar o carregamento executa o callback 
 * @param AudioContext   context 
 * @param array  urlList  - lista de urls de audio a serem carregadas
 * @param function callback - funcão de callback
 */
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

/**
 * Concatena dois ArrayBuffer
 * @param {ArrayBuffer} buffer1 The first buffer.
 * @param {ArrayBuffer} buffer2 The second buffer.
 */
BufferLoader.prototype.appendBuffer = function(buffer1, buffer2){
  var numberOfChannels = Math.min( buffer1.numberOfChannels, buffer2.numberOfChannels );
  var tmp = this.context.createBuffer( numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate );
  for (var i=0; i<numberOfChannels; i++) {
    var channel = tmp.getChannelData(i);
    channel.set( buffer1.getChannelData(i), 0);
    channel.set( buffer2.getChannelData(i), buffer1.length);
  }
  return tmp;
}

module.exports = BufferLoader;
