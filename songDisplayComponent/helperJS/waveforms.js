var wavesurfer = WaveSurfer.create({
  container: document.querySelector('#waveform'),
  barWidth: 2,
  barHeight: 1, // the height of the wave
  barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
});

wavesurfer.load('./songs_for_soundcloud/01 Inside Out (feat. Charlee).m4a');

wavesurfer.on('ready', function() {
  console.log(wavesurfer.exportPCM());
  // console.log(wavesurfer.exportImage());
});