<template>
  <div class="home">
    <button @click="record" v-if="!isRecording">Gravar</button>
    <button @click="stop" v-if="isRecording">Stop</button>

    <a :href="dataUrl" v-if="dataUrl" target="_blank">Download</a>
    <audio controls autoplay></audio>
  
  </div>
</template>

<script>

import StreamRecorder from '../utils/StreamRecorder';
import BufferLoader from '../utils/BufferLoader';
// import Recorder from '../utils/recorder';
// require('../utils/recorder');

export default {
  name: 'home',
  data () {
    return {
      isRecording: false,
      dataUrl: '',
      recorder: new StreamRecorder()
    }
  },
  mounted() {
    //@TODO -- implementar tratamento para falta de suporte a captura de audio
    console.log(this.recorder.hasGetUserMedia());
  },
  methods: {
    record() {
      this.recorder.startRecord();
      this.isRecording = true;
      this.dataUrl = '';
    },
    stop() {

      //gera um blob com o audio gravado para ser utilizado
      var blob = this.recorder.stopRecord();
      this.dataUrl = (window.URL || window.webkitURL).createObjectURL(blob);

      var context = new (window.AudioContext || window.webkitAudioContext)();
      var destination = context.createMediaStreamDestination();
      var bufferLoader;
      var soundSource = null;

      var bufferToWav = require('audiobuffer-to-wav');//lib para gravar o audio em um arquivo wav

      bufferLoader = new BufferLoader(
        context,
        [
         this.dataUrl, //carrega o audio gravado
         '/static/audio/gemidao.mp3' //carrega o arquivo do gemido
        ],
        (bufferList) => {

          soundSource = context.createBufferSource();
          soundSource.buffer = bufferLoader.appendBuffer(bufferList[0],bufferList[1]);
          
          var wav = bufferToWav(soundSource.buffer)
          var blob = new window.Blob([ new DataView(wav) ], {
            type: 'audio/wav'
          })

          var url = window.URL.createObjectURL(blob)
          var anchor = document.createElement('a')
          document.body.appendChild(anchor)
          anchor.style = 'display: none';

          anchor.href = url
          anchor.download = 'audio.wav'
          anchor.click()
          window.URL.revokeObjectURL(url)
          

        });

      bufferLoader.load();

      this.isRecording = false;
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
