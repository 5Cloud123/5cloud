var wavesurfer = WaveSurfer.create({
  container: document.querySelector('#waveform'),
  barWidth: 2,
  barHeight: 1, // the height of the wave
  barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
});

wavesurfer.load('./Working_For_It.mp3');

wavesurfer.on('ready', function() {
  // wavesurfer.exportPCM();
  console.log(wavesurfer.exportImage());
});
