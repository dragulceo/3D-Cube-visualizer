/* Hoist some variables. */
var audio,
  context = new (window.AudioContext ||
  window.webAudioContext ||
  window.webkitAudioContext)(),
  /* Create a script processor node with a `bufferSize` of 1024. */
  processor = context.createScriptProcessor(1024),
  /* Create an analyser node */
  analyser = context.createAnalyser(),
  size = 32,
  visualizer = require('./visualizer'),
  AudioFileLoader = require('./audio-file-loader'),
  audioFileLoader
  ;

/* Wire the processor into our audio context. */
processor.connect(context.destination);
/* Wire the analyser into the processor */
analyser.size = size;
analyser.connect(processor);

/* Define a Uint8Array to receive the analysers data. */
var data = new Uint8Array(size);

/* Define a `Sound` Class */
var Sound = {
  /* Give the sound an element property initially undefined. */
  element: undefined,
  /* Define a class method of play which instantiates a new Media Element
   * Source each time the file plays, once the file has completed disconnect
   * and destroy the media element source. */
  /* Removed for brevity... */
  play: function() {
    this.setSource(context.createMediaElementSource(this.element));
    /* Call `play` on the MediaElement. */
    this.element.play();
  },

  setSource: function(source) {
    var sound = source;
    this.element.onended = function() {
      sound.disconnect();
      sound = null;
      /* Noop the audioprocess handler when the file finishes. */
      processor.onaudioprocess = function() {};
    }
    /* Add the following line to wire into the analyser. */
    sound.connect(analyser);
    sound.connect(context.destination);

    processor.onaudioprocess = function() {
      /* Populate the data array with the frequency data. */
      analyser.getByteTimeDomainData(data);
      visualizer.update(data);
      /*
      for (var i = 0; i < size; i++) {
        barEls[i].style.width = data[i] + 'px';
      }
      */
    };
  }
};

/* Create an async function which returns a promise of a playable audio element. */
function loadAudioElement(url) {
  return new Promise(function(resolve, reject) {
    var audio = new Audio();
    audio.addEventListener('canplay', function() {
      /* Resolve the promise, passing through the element. */
      resolve(audio);
    });
    /* Reject the promise on an error. */
    audio.addEventListener('error', reject);
    audio.src = url;
  });
}

/* Let's load our file. */
loadAudioElement('assets/demo.wav').then(function(elem) {
  /* Instantiate the Sound class into our hoisted variable. */
  audio = Object.create(Sound);
  /* Set the element of `audio` to our MediaElement. */
  audio.element = elem;
  /* Immediately play the file. */
  require('./controls').setAudioEl(elem);
  audio.play();
}, function(elem) {
  /* Let's throw an the error from the MediaElement if it fails. */
  throw elem.error;
});

audioFileLoader = new AudioFileLoader(
  document.querySelector('div.file-loader input.file'),
  context,
  function (audioBuffer) {
    audio = Object.create(Sound);
    audio.element = audioBuffer;
    //require('./controls').setAudioEl(audioBuffer);
    audio.setSource(audioBuffer);
    audioBuffer.start(0);
  }
);