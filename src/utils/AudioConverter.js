
function AudioConverter() {
  	this.audioBufferToWav = require('audiobuffer-to-wav');//lib para gravar o audio em um arquivo wav
	this.lamejs = require("lamejs");
	// this.lamejs = new lamejs();

	var channels = 1; //1 for mono or 2 for stereo
	var sampleRate = 44100; //44.1khz (normal mp3 samplerate)
	var kbps = 128; //encode 128kbps mp3
	this.mp3encoder = new this.lamejs.Mp3Encoder(channels, sampleRate, kbps);
	this.sampleBlockSize = 1152;

}

/**
 * Converte o buffer do audio para o formato wav
 * @param  {AudioBuffer} buffer - audio gravado
 * @return {ArrayByffer}        - ArrayBuffer com o conteudo do buffer
 */
AudioConverter.prototype.bufferToWav = function(audioBuffer){
	return this.audioBufferToWav(audioBuffer);
}

/**
 * Converte o wav para MP3
 * @param  ArrayBuffer wav - Arquivo de audio em formado wav
 * @return Array - Buffer do audio MP3
 */
AudioConverter.prototype.wavToMp3 = function(wav) {
	var samples = new Int16Array(wav);
	var mp3Data = [];
	var mp3buf;
	var sampleChunk;

	for (var i = 0; i < samples.length; i += this.sampleBlockSize) {
		sampleChunk = samples.subarray(i, i + this.sampleBlockSize);

		mp3buf = this.mp3encoder.encodeBuffer(sampleChunk);
		if (mp3buf.length > 0) {
		  mp3Data.push(mp3buf);
		}
	}

	mp3buf = this.mp3encoder.flush();

	if (mp3buf.length > 0) {
	  mp3Data.push(new Int8Array(mp3buf));
	}

	return mp3Data;
}

/**
 * Converte o buffer para Blob
 * @param  {ArrayBuffer} buffer    - Audio para ser convertido
 * @param  {string} audioType - Tipo de audio para gerar o blob
 * @return {Blob}           - Blob de saida do audio
 */
AudioConverter.prototype.bufferToBlob = function(buffer, audioType){

	var blob = new Blob(buffer, {type: audioType});	
	return blob;
}

module.exports = AudioConverter;