<template>
  <div class="home">
    <button @click="record">Gravar</button>
    <button @click="play">Play</button>

    
    <audio controls autoplay></audio>
  
  </div>
</template>

<script>

// require('../utils/StreamRecorder.js');
import StreamRecorder from '../utils/StreamRecorder';

export default {
  name: 'home',
  data () {
    return {
      isRecording: false,
      audioRecorder: null,
      recordingData: [],
      dataUrl: '',
      recorder: new StreamRecorder()
    }
  },
  methods: {
    record() {
      this.recorder.startRecord();

      // setTimeout(function(){recorder.play()}, 2000);
    },
    play() {
      var blob = this.recorder.stopRecord();

      var mediaControl = document.querySelector('audio');
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(blob);

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
