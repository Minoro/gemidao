<template>
  <div class="record">

    <div class="buttons-wrap">
      <a @click="record" v-if="!isRecording" class="button is-primary record-button">
        <span class="icon is-medium">
          <i class="fa fa-microphone"></i>
        </span>
        Gravar
      </a>
      <a @click="stop" v-if="isRecording" class="button is-success record-button">
        <span class="icon is-medium">
          <i class="fa fa-stop-circle-o"></i>
        </span>
        Parar
      </a>
    </div>

    <div class="buttons-wrap">
      <a 
        class="button download-button" 
        :class="{ 'is-loading' : loadAudio}"
        :href="finalAudioUrl" 
        v-if="loadAudio || finalAudioUrl" 
        target="_blank" 
        download='audio.wav'>
        Download
        <span class="icon">
          <i class="fa fa-download"></i>
        </span>
      </a>
      
    </div>
        
  </div>
</template>

<script>

import StreamRecorder from '../utils/StreamRecorder';
import BufferLoader from '../utils/BufferLoader';

export default {
  name: 'home',
  data () {
    return {
      isRecording: false,
      loadAudio: false,
      dataUrl: '', //url do audio gravado pelo microfone
      finalAudioUrl: '', //url para download do arquivo final
      recorder: new StreamRecorder()
    }
  },
  mounted() {
    //@TODO -- implementar tratamento para falta de suporte a captura de audio
    // console.log(this.recorder.hasGetUserMedia());
  },
  methods: {
    record() {
      this.recorder.startRecord();
      this.isRecording = true;
      this.loadAudio = false;
      this.dataUrl = '';
      this.finalAudioUrl = '';
    },
    stop() {

      //flag para o botão
      this.loadAudio = true;

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
          
          //gera o arquivo de saida
          var wav = bufferToWav(soundSource.buffer)
          var blob = new window.Blob([ new DataView(wav) ], {
            type: 'audio/wav'
          })

          //url do blob do arquivo final
          this.finalAudioUrl = window.URL.createObjectURL(blob);
          
          this.loadAudio = false;
        });

      bufferLoader.load();

      this.isRecording = false;
    }
  }
}
</script>

<style>
.record-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 18px;
  padding-top: 20px;
}

.record-button .icon {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: 0 auto !important;
}

.buttons-wrap {
  display: block;
  margin-top: 20px;
}
</style>
