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
      var blob = this.recorder.stopRecord();

      // passa o audio para o player 
      // var mediaControl = document.querySelector('audio');
      // mediaControl.src = (window.URL || window.webkitURL).createObjectURL(blob);

      this.dataUrl = (window.URL || window.webkitURL).createObjectURL(blob);


      console.log(this.dataUrl);
      console.log(typeof(blob));
      console.log(blob);

      // var array_buffer = this.recorder.dataURItoArrayBuffer(this.dataUrl);
      var context = new (window.AudioContext || window.webkitAudioContext)();
      var destination = context.createMediaStreamDestination();
      var bufferLoader;
      var soundSource = null;
      bufferLoader = new BufferLoader(
        context,
        [
         this.dataUrl,
         '/static/audio/gemidao.mp3'
        ],
        function(bufferList){
          var source1 = context.createBufferSource();
          source1.buffer = bufferLoader.appendBuffer(bufferList[0],bufferList[1]);
          console.log(source1.buffer);
          source1.connect(context.destination);
          source1.start(0);
        });

      bufferLoader.load();
     
      this.isRecording = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
