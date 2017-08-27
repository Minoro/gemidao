<template>
  <div class="record container section">

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
    
    <div class="buttons-wrap" v-if="!isRecording">
      <b-switch :on-change="changeOutputFormat"></b-switch>{{outputFormat}}
    </div>

    <div class="text" v-if="loadAudio">
      <div class="column is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <p>Aguarde, isso pode levar um momento</p>
        </div>
      </div>
    </div>

    <div class="buttons-wrap">
      <a 
        class="button download-button" 
        :class="{ 'is-loading' : loadAudio}"
        :href="finalAudioUrl" 
        v-if="loadAudio || finalAudioUrl" 
        target="_blank" 
        :download='downloadFile'>
        Download
        <span class="icon">
          <i class="fa fa-download"></i>
        </span>
      </a>
      
    </div>
    
    <div class="text">
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <p>Grave um audio com o seu microfone e ao final do audio será colocado o <strong>Gemidão do Zap</strong>, faça o download, envie para os seus amigos e OOOHHHH AHHH OOOHHHHHHHH AAAAHHHHH! Você caiu no <strong>Gemidão do Zap!</strong></p>

          <a class="button" href="https://github.com/Minoro/gemidao" target="_blank">
            <span class="icon is-medium">
              <i class="fa fa-github"></i>
            </span>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import StreamRecorder from '../utils/StreamRecorder';
import BufferLoader from '../utils/BufferLoader';
import AudioConverter from '../utils/AudioConverter';

export default {
  name: 'home',
  data () {
    return {
      isRecording: false,
      loadAudio: false,
      dataUrl: '', //url do audio gravado pelo microfone
      finalAudioUrl: '', //url para download do arquivo final
      downloadFile: 'audio.wav',//nome do arquivo de saida
      outputFormat: 'wav',
      recorder: new StreamRecorder(),
      audioConverter: new AudioConverter()
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

      bufferLoader = new BufferLoader(
        context,
        [
         this.dataUrl, //carrega o audio gravado
         '/static/audio/gemidao.mp3' //carrega o arquivo do gemido
        ],
        (bufferList) => {

          //concatena o audio do microfone com o gemido
          soundSource = context.createBufferSource();
          soundSource.buffer = bufferLoader.appendBuffer(bufferList[0],bufferList[1]);
          

          //gera o arquivo de saida 
          var wav = this.audioConverter.bufferToWav(soundSource.buffer);
         
          if(this.outputFormat === 'mp3'){
            var mp3Buffer = this.audioConverter.wavToMp3(wav);
            var blob = this.audioConverter.bufferToBlob(mp3Buffer, 'audio/mp3');
          } else {
            var blob = this.audioConverter.bufferToBlob([ new DataView(wav) ], 'audio/wav');
          }

          //url do blob do arquivo final
          this.finalAudioUrl = window.URL.createObjectURL(blob);
          
          this.loadAudio = false;

          //volta para o valor original
          this.outputFormat = 'wav';
          this.downloadFile = 'audio.wav';
        });

      bufferLoader.load();

      this.isRecording = false;
    },
    changeOutputFormat() {
      if(this.outputFormat === 'wav'){
        this.outputFormat = 'mp3';
        this.downloadFile = 'audio.mp3';
      }else {
        this.outputFormat = 'wav';
        this.downloadFile = 'audio.wav';
      }
    }
  }
}
</script>

<style scoped>
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
  margin: 20px auto;
}

.text p {
  font-size: 16px;
}

</style>
