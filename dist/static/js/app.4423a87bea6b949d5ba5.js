webpackJsonp([0],[,,function(t,e,a){"use strict";var o=a(0),n=a(17),r=a(14),i=a.n(r);o.default.use(n.a),e.a=new n.a({routes:[{path:"/",name:"Recorder",component:i.a}]})},function(t,e){},,function(t,e,a){function o(t){a(13)}var n=a(1)(a(7),a(16),o,null,null);t.exports=n.exports},,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(11),n=a.n(o),r=a(10),i=a.n(r);e.default={name:"home",data:function(){return{isRecording:!1,loadAudio:!1,dataUrl:"",finalAudioUrl:"",recorder:new n.a}},mounted:function(){},methods:{record:function(){this.recorder.startRecord(),this.isRecording=!0,this.loadAudio=!1,this.dataUrl="",this.finalAudioUrl=""},stop:function(){var t=this;this.loadAudio=!0;var e=this.recorder.stopRecord();this.dataUrl=(window.URL||window.webkitURL).createObjectURL(e);var o,n=new(window.AudioContext||window.webkitAudioContext),r=(n.createMediaStreamDestination(),null),s=a(6);o=new i.a(n,[this.dataUrl,"/static/audio/gemidao.mp3"],function(e){r=n.createBufferSource(),r.buffer=o.appendBuffer(e[0],e[1]);var a=s(r.buffer),i=new window.Blob([new DataView(a)],{type:"audio/wav"});t.finalAudioUrl=window.URL.createObjectURL(i),t.loadAudio=!1}),o.load(),this.isRecording=!1}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(0),n=a(5),r=a.n(n),i=a(2),s=a(4),d=a.n(s),u=a(3);a.n(u);o.default.use(d.a),o.default.config.productionTip=!1,new o.default({el:"#app",router:i.a,template:"<App/>",components:{App:r.a}})},function(t,e){function a(t,e,a){this.context=t,this.urlList=e,this.onload=a,this.bufferList=new Array,this.loadCount=0}a.prototype.loadBuffer=function(t,e){var a=new XMLHttpRequest;a.open("GET",t,!0),a.responseType="arraybuffer";var o=this;a.onload=function(){o.context.decodeAudioData(a.response,function(a){if(!a)return void alert("error decoding file data: "+t);o.bufferList[e]=a,++o.loadCount==o.urlList.length&&o.onload(o.bufferList)},function(t){console.error("decodeAudioData error",t)})},a.onerror=function(){alert("BufferLoader: XHR error")},a.send()},a.prototype.load=function(){for(var t=0;t<this.urlList.length;++t)this.loadBuffer(this.urlList[t],t)},a.prototype.appendBuffer=function(t,e){for(var a=Math.min(t.numberOfChannels,e.numberOfChannels),o=this.context.createBuffer(a,t.length+e.length,t.sampleRate),n=0;n<a;n++){var r=o.getChannelData(n);r.set(t.getChannelData(n),0),r.set(e.getChannelData(n),t.length)}return o},t.exports=a},function(t,e){var a=function(){var t=this;this.hasGetUserMedia=function(){return!!(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)},this.getUserMedia=function(t,e,a){var o=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;if(o)return o.bind(navigator)(t,e,a);alert("User Media API not supported.")},this.startRecord=function(){var e={};if(e.audio=!0,this.recordingData=[],!this.hasGetUserMedia())return!1;this.getUserMedia(e,function(e){t.audioRecorder=new MediaRecorder(e),t.audioRecorder.ondataavailable=function(e){t.recordingData.push(e.data)},t.audioRecorder.start(100)},function(t){alert("Error: "+t)})},this.stopRecord=function(){return t.audioRecorder.stop(),new Blob(t.recordingData,{type:"audio/mp3"})}};t.exports=a},function(t,e){},function(t,e){},function(t,e,a){function o(t){a(12)}var n=a(1)(a(8),a(15),o,"data-v-1676c4b7",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"record container section"},[a("div",{staticClass:"buttons-wrap"},[t.isRecording?t._e():a("a",{staticClass:"button is-primary record-button",on:{click:t.record}},[t._m(0),t._v("\n      Gravar\n    ")]),t._v(" "),t.isRecording?a("a",{staticClass:"button is-success record-button",on:{click:t.stop}},[t._m(1),t._v("\n      Parar\n    ")]):t._e()]),t._v(" "),a("div",{staticClass:"buttons-wrap"},[t.loadAudio||t.finalAudioUrl?a("a",{staticClass:"button download-button",class:{"is-loading":t.loadAudio},attrs:{href:t.finalAudioUrl,target:"_blank",download:"audio.wav"}},[t._v("\n      Download\n      "),t._m(2)]):t._e()]),t._v(" "),t._m(3)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon is-medium"},[a("i",{staticClass:"fa fa-microphone"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon is-medium"},[a("i",{staticClass:"fa fa-stop-circle-o"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-download"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text"},[a("div",{staticClass:"columns is-mobile"},[a("div",{staticClass:"column is-half is-offset-one-quarter"},[a("p",[t._v("Grave um audio com o seu microfone e ao final do audio será colocado o "),a("strong",[t._v("Gemidão do Zap")]),t._v(", faça o download, envie para os seus amigos e OOOHHHH AHHH OOOHHHHHHHH AAAAHHHHH! Você caiu no "),a("strong",[t._v("Gemidão do Zap!")])])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("main",[a("router-view")],1)])},staticRenderFns:[]}}],[9]);
//# sourceMappingURL=app.4423a87bea6b949d5ba5.js.map