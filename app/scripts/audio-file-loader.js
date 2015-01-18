
var AudioFileLoader = function (elem, audioContext, onReady) {
  var self = this;
  this.onReady = onReady || function () {};
  this.audioContext = audioContext;
  elem.addEventListener('change', function () {
    var reader, files = this.files;
    if (files.length > 0) {
      console.log('we got files');
      reader = new FileReader();
      reader.onload = function (e) {
        self.setRawLoadedData(e.currentTarget.result);
      };
      reader.readAsArrayBuffer(files[0]);
    }
  });
}

AudioFileLoader.prototype.getAudioContext = function() {
  return this.audioContext;
};

AudioFileLoader.prototype.setBufferSource = function(buffer) {
  var audioContext = this.getAudioContext(),
    audioBuffer = audioContext.createBufferSource();
  audioBuffer.buffer = buffer;
  audioBuffer.playbackRate.value = 1.0;
  this.onReady(audioBuffer);
  return audioBuffer;
};

AudioFileLoader.prototype.setRawLoadedData = function(data) {
  var self = this;
  this.getAudioContext().decodeAudioData(data, function(buffer) {
    self.setBufferSource(buffer);
  });
};

module.exports = AudioFileLoader;