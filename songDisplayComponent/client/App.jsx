
// Calculate relative date posted
const calculateDatePosted = (dateInteger) => {
  const today = Date.now();
  const daysSince = Math.round((today - dateInteger) / (1000 * 60 * 60 * 24));
  // If in years, record years
  if (548 > daysSince >= 350) {
    return `${Math.round(daysSince / 365, 0)} year ago`;
  }
  if (daysSince >= 350) {
    return `${Math.round(daysSince / 365, 0)} years ago`;
  }
  // If in months, record months
  if (45 > daysSince >= 27) {
    return `${Math.round(daysSince / 30, 0)} month ago`;
  }
  if (daysSince >= 27) {
    return `${Math.round(daysSince / 30, 0)} months ago`;
  }
  // If in weeks, record weeks
  if (daysSince === 7) {
    return `${Math.round(daysSince / 8, 0)} week ago`;
  }
  if (daysSince >= 6) {
    return `${Math.round(daysSince / 7, 0)} weeks ago`;
  }
  // If in days, record days
  if (daysSince === 1) {
    return `${Math.round(daysSince, 0)} day ago`;
  }
  if (daysSince > 1) {
    return `${Math.round(daysSince, 0)} days ago`;
  }
  // If in hours, record hours
  if (daysSince >= 1 / 24) {
    return `${Math.round(daysSince / 24, 1)} hours ago`;
  }
  // If in minutes, record minutes
  if (daysSince >= 1 / 1440) {
    return `${Math.round(daysSince / 1440, 0)} minutes ago`;
  }
  // If in seconds, record < 1 minute
  if (daysSince <= 1 / 1440) {
    return 'Less than a minute ago';
  }
};

// Calculate the playback time in mm:ss
const calculateMMSS = (seconds) => {
  var secondsInt = parseInt(seconds, 10);
  var minutes = Math.floor(secondsInt / 60) % 60;
  var seconds = secondsInt % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  return [minutes, seconds].filter((v, i) => v !== '00' || i > 0).join(':');
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Set state - mostly revolves around current song playing
    this.state = {
      // Song Audio is a JS Audio object
      currentSongAudio: new Audio(),
      // Store current song's metadata
      currentSongObj: {
        Id: 0,
        song_id: 'Song_00000',
        song_name: '',
        artist_name: '',
        upload_time: '',
        tag: '',
        song_art_url: '',
        song_data_url: '',
        background_light: '(168, 12, 20)',
        background_dark: '(68, 76, 60)',
        currentTime: 0,
        currentTimeMMSS: '00',
        durationMMSS: '00:00',
      },
      songQueueAudio: [],
      songQueueObjects: [],
      songObjs: [],
      // Store ID of interval for timer
      timerIntervalID: null,
      playButtonState: 'play',
      // Record ids of songs already played
      songsPlayedIDs: new Set(),
      songPlayerPixelWidth: 0,
    };

    // Bind functions to this
    this.setState = this.setState.bind(this);
    this.recordNextSongsLength = this.recordNextSongsLength.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.playNextFromQueue = this.playNextFromQueue.bind(this);
    this.initialGetThreeSongs = this.initialGetThreeSongs.bind(this);
    this.backgroundGetThreeSongs = this.backgroundGetThreeSongs.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.drawWaveform = this.drawWaveform.bind(this);
    this.updateWaveformColor = this.updateWaveformColor.bind(this);
  }

  // On mount, get some songs from S3; set interval to get more songs
  componentDidMount() {
    // GET songs from db
    this.initialGetThreeSongs();
    // Save component's width
    const songPlayerPixelWidth = this.divElement.clientWidth;
    this.setState({songPlayerPixelWidth});
    // Set listener to get more songs if user has fewer than two songs enqueued
    setInterval(() => {
      if (this.state.songQueueAudio.length < 2) {
        console.log('loading more songs!');
        this.backgroundGetThreeSongs();
      }
    }, 10000);
  }

  // Get three songs loaded from AWS
  initialGetThreeSongs() {
    axios
      .get('http://localhost:5001/three-songs')
      .then((response) => {
        const songObjs = response.data;
        // Create first song's audio file
        const firstSongObj = songObjs.pop();
        firstSongObj.date_posted = calculateDatePosted(
          firstSongObj.upload_time
        );
        const firstSongAudio = new Audio(firstSongObj.song_data_url);
        // firstSongObj.durationMMSS = calculateMMSS(firstSongAudio)
        // Set to state then do the same for the rest of the songs
        this.setState(
          {
            currentSongObj: firstSongObj,
            currentSongAudio: firstSongAudio,
          },
          () => {
            // Draw waveform playback chart when sonds metadata is loaded
            this.state.currentSongAudio.addEventListener(
              'loadedmetadata',
              () => {
                // Calculate total length as string MM:SS
                const currentSongObj = this.state.currentSongObj;
                currentSongObj.durationMMSS = calculateMMSS(this.state.currentSongAudio.duration);
                this.setState({currentSongObj});
                this.drawWaveform();
              }
            );
            // Create Audio object for remaining songs
            const remainingSongsAudio = [];
            for (let i = 0; i < songObjs.length; i++) {
              songObjs[i].date_posted = calculateDatePosted(
                songObjs[i].upload_time
              );
              remainingSongsAudio.push(new Audio(songObjs[i].song_data_url));
            }
            // Set state with new audio objects, song objects
            this.setState({
              songQueueAudio: remainingSongsAudio,
              songQueueObjects: songObjs,
            });
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Get one song loaded from AWS
  backgroundGetThreeSongs() {
    axios
      .get('http://localhost:5001/three-songs')
      .then((response) => {
        const songObjs = response.data;
        // Create Audio object for remaining songs
        const remainingSongsAudio = [];
        const remainingSongsObjs = [];
        for (let i = 0; i < songObjs.length; i++) {
          // Only process, enqueue songs not yet played
          if (!this.state.songsPlayedIDs.has(songObjs.song_id)) {
            // Convert date posted to relative data posted
            songObjs[i].date_posted = calculateDatePosted(
              songObjs[i].upload_time
            );
            remainingSongsAudio.push(new Audio(songObjs[i].song_data_url));
            remainingSongsObjs.push(songObjs[i]);
          }
        }
        // Set state with new audio objects, song objects
        this.setState({
          songQueueAudio: remainingSongsAudio,
          songQueueObjects: remainingSongsObjs,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Remove song from Audio and Obj queues; set to current song in state
  playNextFromQueue() {
    // If queue has songs, get the next one
    if (this.state.songQueueAudio.length) {
      const {songQueueAudio, songQueueObjects} = this.state;
      const songAudio = songQueueAudio.pop();
      const songObj = songQueueObjects.pop();
      // Set current playback time to 0
      songObj.currentTime = 0;
      songObj.currentTimeMMSS = calculateMMSS(songObj.currentTime);
      songObj.durationMMSS = calculateMMSS(songAudio.duration);
      // Stop current song's playback
      this.pauseSong();
      this.setState(
        {
          currentSongAudio: songAudio,
          songQueueAudio: songQueueAudio,
          songQueueObjects: songQueueObjects,
          timerIntervalID: null,
          currentSongObj: songObj,
        },
        () => {
          // Draw waveform playback chart
          this.drawWaveform();
          // Start current song's playback
          this.playSong();
        }
      );
    } else {
      this.initialGetThreeSongs();
    }
  }

  // Calculate a song's length in format MM:SS; save in state
  recordNextSongsLength(songAudio) {
    // Iteratively reduce durationRemaining to create time string
    let durationRemaining = Math.floor(songAudio.duration);
    let length = '';
    // If 1+ hours long, record those hours
    if (durationRemaining > 3600) {
      const hours = Math.floor(durationRemaining / 3600);
      length += `${hours}:`;
      durationRemaining -= hours * 3600;
    }
    // If 1+ minutes long, record those minutes
    if (durationRemaining > 60) {
      const minutes = Math.floor(durationRemaining / 60);
      length += `${minutes}:`;
      durationRemaining -= minutes * 60;
    } else {
      length += '0:';
    }
    // If 1+ seconds long, record those seconds
    if (durationRemaining > 0) {
      if (durationRemaining < 10) {
        // If sinlgle-digit, pad-
        length += JSON.stringify(durationRemaining).padStart(2, '0');
      } else {
        length += `${durationRemaining}`;
      }
    }
    // Save to state
    this.setState((state) => {
      const {currentSongObj} = state;
      currentSongObj.lengthString = length;
      return {
        currentSongObj,
      };
    });
  }

  // Start song playback if a song is selected
  playSong() {
    if (this.state.currentSongAudio) {
      console.log('playing song: ', this.state.currentSongAudio);
      // Change play button to pause button
      this.setState({playButtonState: 'pause'}, () => {
        this.state.currentSongAudio.play();
        // Listen for song to finish
        this.state.currentSongAudio.addEventListener('ended', () => {
          // Start next song
          this.playNextFromQueue();
        });
        // Start song timer
        this.startTimer();
        // Record song as having been played
        this.setState((state) => {
          return {
            songsPlayedIDs: state.songsPlayedIDs.add(
              state.currentSongObj.song_id
            ),
          };
        });
      });
    }
  }

  // Pause song playback if a song is selected
  pauseSong() {
    if (this.state.currentSongAudio) {
      // Change play button to pause button
      this.setState({playButtonState: 'play'});
      this.state.currentSongAudio.pause();
      // Stop song timer
      this.stopTimer();
    }
  }

  // Increment the current song's timer every second
  incrementTimer() {
    const currentTime = this.state.currentSongAudio.currentTime;
    const currentSongObj = this.state.currentSongObj;
    currentSongObj.currentTime = Math.floor(currentTime + 1);
    currentSongObj.currentTimeMMSS = calculateMMSS(currentSongObj.currentTime);
    this.setState({currentSongObj}, this.drawWaveform);
  }

  // Start playback timer for current song; save interval's ID in state
  startTimer() {
    // Update timer every second
    const timerIntervalID = setInterval(this.incrementTimer, 1000);
    // Record id of interval
    this.setState({
      timerIntervalID,
    });
  }

  // Stop the timer for current song playback; use timer interval ID in state
  stopTimer() {
    // Get ID of timer currently running
    const ID = this.state.timerIntervalID;
    // Clear interval with id
    clearInterval(ID);
  }

  // Toggle current place in song using the slider
  handleSliderChange(event) {
    // Save currentTime in object
    const newSongObj = this.state.currentSongObj;
    newSongObj.currentTime = event.target.value;
    // Save currentTime in audio object as well
    const newSongAudio = this.state.currentSongAudio;
    newSongAudio.currentTime = event.target.value;
    // Persis in state
    this.setState({
      test: event.target.value,
      currentSongObj: newSongObj,
      currentSongAudio: newSongAudio,
    });
  }

  // Draw playback waveform bar chart
  drawWaveform() {
    const original_data = [0.4302,-0.2578,0.2004,-0.3092,0.2212,-0.114,0.1561,-0.1608,0.1064,-0.1487,0.1162,-0.0994,0.0834,-0.0808,0.1779,-0.3497,0.2942,-0.3315,0.2477,-0.1583,0.2563,-0.2333,0.2654,-0.325,0.2369,-0.2539,0.121,-0.2456,0.0985,-0.1335,0.0759,-0.0649,0.1089,-0.0904,0.0808,-0.2804,0.3195,-0.3403,0.3761,-0.3494,0.182,-0.2018,0.3027,-0.2279,0.309,-0.6068,0.1777,-0.4745,0.1616,-0.2206,0.1273,-0.2227,0.1254,-0.1709,0.1231,-0.1194,0.4565,-0.4424,0.2294,-0.2995,0.3381,-0.3453,0.1942,-0.1704,0.368,-0.9409,0.4008,-0.2433,0.353,-0.1882,0.1447,-0.1977,0.1179,-0.0935,0.1619,-0.1018,0.0754,-0.1324,0.5056,-0.4803,0.2545,-0.2244,0.1858,-0.1937,0.2425,-0.2433,0.4213,-0.8091,0.0738,-0.1354,0.0829,-0.0395,0.0397,-0.0351,0.0029,-0.002,0.001,-0.0006,0.3755,-0.7779,0.2572,-0.8943,0.3619,-0.5272,0.3244,-0.2613,0.7158,-0.9821,0.8292,-0.1873,0.1068,-0.126,0.2244,-0.2937,0.2441,-0.25,0.1753,-0.2243,0.125,-0.1698,0.7225,-0.9919,0.4184,-0.5206,0.2395,-0.4397,0.2649,-0.427,0.5104,-0.4603,0.223,-0.1944,0.2095,-0.2173,0.2341,-0.316,0.1808,-0.166,0.1749,-0.1697,0.6664,-0.5869,0.6383,-0.7065,0.2461,-0.2636,0.1379,-0.1167,0.9219,-0.6474,0.5689,-0.6446,0.0069,-0.0297,0.1281,-0.2564,0.0028,-0.0111,0.0019,-0.0012,0.0012,-0.001,0.9675,-0.6161,0.2629,-0.3973,0.1594,-0.3209,0.6281,-0.3358,0.8117,-0.4829,0.1728,-0.1925,0.2923,-0.1033,0.0534,-0.0486,0.1271,-0.1293,0.1013,-0.0962,0.7752,-0.4967,0.8233,-0.255,0.2518,-0.2059,0.2469,-0.2422,0.6808,-0.5067,0.551,-0.7936,0.2019,-0.2729,0.1973,-0.4575,0.1837,-0.2615,0.2259,-0.2837,0.0625,-0.13,0.8096,-0.6601,0.793,-0.8304,0.3159,-0.6618,0.3352,-0.688,0.6388,-0.9924,0.5095,-0.408,0.1263,-0.2315,0.1992,-0.1822,0.2511,-0.2644,0.3007,-0.1522,0.1905,-0.9587,0.4859,-0.9609,0.3021,-0.2167,0.3694,-0.2581,0.2448,-0.3818,0.9182,-0.495,0.1995,-0.2303,0.1211,-0.1778,0.2789,-0.1308,0.2118,-0.1288,0.0865,-0.098,0.9279,-0.286,0.5519,-0.2942,0.2641,-0.1509,0.1535,-0.213,0.8621,-0.4162,0.4644,-0.2658,0.156,-0.2072,0.4118,-0.1133,0.1928,-0.3137,0.0885,-0.2869,0.1085,-0.4108,0.7908,-0.9814,0.3995,-0.8467,0.2754,-0.4987,0.2766,-0.0298,0.9414,-0.378,0.4082,-0.2005,0.3815,-0.2351,0.3709,-0.1986,0.3669,-0.2839,0.3519,-0.1739,0.9387,-0.5027,0.7464,-0.2306,0.4145,-0.5151,0.3401,-0.4877,0.6607,-0.717,0.2572,-0.8227,0.1942,-0.2052,0.1812,-0.2327,0.2719,-0.3566,0.2209,-0.3576,0.1215,-0.2499,0.6615,-0.6706,0.5139,-0.688,0.4649,-0.4459,0.3432,-0.1881,0.6501,-0.918,0.3389,-0.2787,0.2511,-0.146,0.2434,-0.2998,0.2511,-0.1064,0.2641,-0.2807,0.338,-0.7352,0.4289,-0.5563,0.4201,-0.6043,0.5262,-0.5305,0.229,-0.3622,0.543,-0.4975,0.4594,-0.4624,0.6029,-0.5762,0.3988,-0.4843,0.278,-0.4944,0.2304,-0.2878,0.6047,-0.555,0.1501,-0.6765,0.5519,-0.5675,0.2558,-0.2757,0.8511,-0.4505,0.4108,-0.2528,0.1956,-0.2318,0.1116,-0.4253,0.1799,-0.1088,0.1978,-0.1365,0.9433,-0.2424,0.9054,-0.6998,0.6768,-0.5165,0.3859,-0.3728,0.775,-0.6315,0.7287,-0.6226,0.2503,-0.2372,0.5412,-0.4017,0.3552,-0.4174,0.36,-0.4241,0.301,-0.2645,0.7303,-0.8848,0.4139,-0.6927,0.3751,-0.4612,0.2461,-0.243,0.5204,-0.6296,0.367,-0.4788,0.4249,-0.3578,0.2757,-0.65,0.4609,-0.3041,0.1657,-0.2684,0.1864,-0.1266,0.6553,-0.9117,0.5302,-0.5642,0.1391,-0.556,0.6043,-0.8179,0.7546,-0.8209,0.6759,-0.4496,0.5422,-0.4061,0.4584,-0.5638,0.5507,-0.8177,0.2661,-0.5304,0.6782,-0.3945,0.5962,-0.7534,0.809,-0.262,0.5849,-0.2616,0.5701,-0.9201,0.6962,-0.6614,0.82,-0.3892,0.5732,-0.8854,0.6262,-0.2811,0.1826,-0.7536,0.765,-0.1194,0.5927,-0.3548,0.5276,-0.6786,0.5062,-0.4296,0.5281,-0.6363,0.7066,-0.8398,0.46,-0.8406,0.4469,-0.8029,0.4615,-0.7754,0.4949,-0.7033,0.3013,-0.4132,0.7821,-0.4165,0.9727,-0.8527,0.5911,-0.6204,0.6673,-0.5116,0.4427,-0.7672,0.6821,-0.5733,0.501,-0.5902,0.1406,-0.7771,0.4357,-0.5557,0.6191,-0.6419,0.6069,-0.2672,0.6204,-0.3267,0.7479,-0.662,0.6724,-0.3994,0.5388,-0.9279,0.5883,-0.8612,0.5807,-0.5538,0.5742,-0.6802,0.612,-0.5034,0.4353,-0.3401,0.6285,-0.6293,0.5176,-0.6402,0.813,-0.6957,0.6572,-0.6719,0.8804,-0.7443,0.8602,-0.6057,0.6353,-0.4125,0.6288,-0.8011,0.5001,-0.7165,0.6205,-0.4908,0.6297,-0.6591,0.6467,-0.6348,0.76,-0.9271,0.9588,-0.4211,0.7359,-0.4532,0.739,-0.5627,0.5164,-0.6051,0.4929,-0.5531,0.9035,-0.5777,0.4955,-0.8114,0.6095,-0.5867,0.6077,-0.4353,0.5507,-0.8839,0.7525,-0.7664,0.5574,-0.4094,0.4585,-0.4231,0.436,-0.6356,0.6434,-0.8863,0.6049,-0.3251,0.6495,-0.5198,0.3265,-0.5713,0.3551,-0.4194,0.4866,-0.5292,0.5849,-0.4046,0.3831,-0.3166,0.3357,-0.6315,0.4993,-0.2944,0.8326,-0.3455,0.7338,-0.5881,0.4024,-0.1162,0.4368,-0.8029,0.4863,-0.2845,0.4415,-0.5121,0.5412,-0.3363,0.8329,-0.741,0.5237,-0.9905,0.4611,-0.3262,0.3845,-0.2341,0.2937,-0.9745,0.1762,-0.3882,0.6482,-0.2155,0.3587,-0.4992,0.4271,-0.4633,0.574,-0.4875,0.631,-0.8623,0.38,-0.4643,0.6823,-0.4488,0.8568,-0.9735,0.6117,-0.5508,0.919,-0.6829,0.4034,-0.4783,0.5388,-0.3717,0.3859,-0.3994,0.453,-0.5558,0.3704,-0.4651,0.6321,-0.8553,0.6047,-0.3812,0.6189,-0.2992,0.4409,-0.6129,0.6557,-0.3476,0.4241,-0.6935,0.4292,-0.8638,0.4685,-0.3151,0.488,-0.7704,0.533,-0.5937,0.5646,-0.5062,0.7422,-0.626,0.7326,-0.7159,0.5127,-0.9153,0.7898,-0.9218,0.4953,-0.9206,0.4592,-0.4408,0.6088,-0.7032,0.3922,-0.3035,0.353,-0.3425,0.3647,-0.6027,0.5048,-0.9032,0.7257,-0.6261,0.6791,-0.4975,0.3363,-0.2973,0.8608,-0.6126,0.3688,-0.4592,0.3217,-0.2757,0.2631,-0.5369,0.1607,-0.4388,0.2758,-0.2461,0.5425,-0.4518,0.7935,-0.6277,0.7501,-0.7321,0.7334,-0.8415,0.8133,-0.6829,0.7682,-0.7497,0.4983,-0.3378,0.4634,-0.7573,0.638,-0.4761,0.2655,-0.3266,0.4056,-0.3656,0.6323,-0.9918,0.2187,-0.7553,0.7807,-0.6829,0.5013,-0.6836,0.616,-0.8489,0.6118,-0.5841,0.5969,-0.2518,0.6077,-0.4165,0.6619,-0.4548,0.1562,-0.6149,0.5604,-0.5379,0.9821,-0.8657,0.6828,-0.3492,0.6991,-0.8361,0.7021,-0.9213,0.9176,-0.5042,0.2544,-0.1515,0.0482,-0.0481,0.0756,-0.0065,0.0071,-0.0072,0.0038,-0.0031,0.7902,-0.0936,0.1981,-0.2328,0.4065,-0.4131,0.1912,-0.1879,0.5908,-0.951,0.3463,-0.6013,0.393,-0.1219,0.2929,-0.2125,0.2408,-0.1704,0.1684,-0.1526,0.076,-0.3158,0.7733,-0.9262,0.5696,-0.3359,0.3596,-0.5076,0.6523,-0.2158,0.6462,-0.5634,0.2135,-0.0852,0.3176,-0.1833,0.2171,-0.1501,0.1831,-0.1878,0.2275,-0.2328,0.547,-0.7972,0.51,-0.0745,0.2611,-0.3592,0.188,-0.2015,0.9499,-0.7167,0.1934,-0.5501,0.0258,-0.08,0.0456,-0.1108,0.0044,-0.0076,0.0025,-0.0011,0.0014,-0.0007,0.7932,-0.8828,0.7621,-0.3735,0.1829,-0.5787,0.7193,-0.6003,0.4794,-0.432,0.5074,-0.1415,0.1552,-0.1522,0.0449,-0.0474,0.2209,-0.1077,0.0899,-0.0964,0.5713,-0.7928,0.4256,-0.8686,0.4316,-0.3917,0.3422,-0.3305,0.9036,-0.1051,0.757,-0.1971,0.3033,-0.3494,0.2437,-0.2148,0.5302,-0.206,0.2434,-0.1963,0.1098,-0.2036,0.7891,-0.1215,0.2271,-0.2957,0.4206,-0.3073,0.5143,-0.5377,0.8235,-0.9661,0.1786,-0.4039,0.3273,-0.1956,0.6418,-0.1741,0.1376,-0.1904,0.1986,-0.2641,0.6514,-0.8725,0.6998,-0.9806,0.3884,-0.3752,0.2779,-0.2801,0.2722,-0.7521,0.7059,-0.9695,0.1241,-0.2349,0.1149,-0.2386,0.1183,-0.0847,0.0861,-0.1129,0.1021,-0.0797,0.7018,-0.6559,0.7391,-0.2367,0.148,-0.2181,0.1954,-0.1508,0.4679,-0.9444,0.1993,-0.7453,0.174,-0.1454,0.308,-0.2639,0.4214,-0.2455,0.2556,-0.2927,0.1665,-0.2673,0.8272,-0.8173,0.5034,-0.8034,0.6005,-0.3211,0.9897,-0.1474,0.8226,-0.3825,0.1963,-0.6165,0.4892,-0.3456,0.2877,-0.2783,0.4571,-0.1811,0.4264,-0.2427,0.7349,-0.6432,0.9233,-0.2317,0.4895,-0.394,0.6376,-0.6475,0.804,-0.3041,0.562,-0.2979,0.221,-0.2345,0.167,-0.2409,0.5295,-0.6345,0.2521,-0.3881,0.4978,-0.186,0.9023,-0.6018,0.3848,-0.6993,0.9221,-0.4719,0.1377,-0.3592,0.5343,-0.9109,0.3456,-0.3199,0.4912,-0.1892,0.2687,-0.3246,0.3411,-0.1773,0.3435,-0.2036,0.5471,-0.8652,0.389,-1.0086,0.8147,-0.475,0.7977,-0.4537,0.587,-0.7212,0.7224,-0.5527,0.4995,-0.5193,0.5739,-0.9036,0.2081,-0.5485,0.429,-0.5815,0.2283,-0.2688,0.747,-0.9123,0.757,-0.2894,0.2565,-0.76,0.5059,-0.7162,0.8713,-0.601,0.4488,-0.5212,0.3397,-0.3811,0.1428,-0.253,0.1628,-0.363,0.2484,-0.1954,0.781,-0.8447,0.6165,-0.6632,0.4987,-0.7807,0.4612,-0.6784,0.8626,-0.6116,0.4681,-0.4448,0.329,-0.6594,0.3363,-0.7405,0.4165,-0.3113,0.4351,-0.4415,0.4293,-0.4493,0.8807,-0.6488,0.3801,-0.8909,0.4356,-0.448,0.4162,-0.6306,0.8811,-0.3777,0.3518,-0.8079,0.3063,-0.3211,0.5833,-0.155,0.8376,-0.3301,0.1781,-0.2607,0.8922,-0.1872,0.9966,-0.5299,0.8063,-0.3923,0.561,-0.6916,0.5358,-0.5064,0.5959,-0.6231,0.5793,-0.4863,0.3682,-0.7288,0.4515,-0.5673,0.3765,-0.6396,0.6411,-0.6951,0.6999,-0.9752,0.4832,-0.8678,0.7453,-0.6905,0.9382,-0.8373,0.8961,-0.6922,0.4749,-0.7376,0.6519,-0.5361,0.4054,-0.6402,0.5789,-0.417,0.5528,-0.597,0.4559,-0.831,0.7171,-0.7677,0.7934,-0.8381,0.7442,-0.5474,0.8286,-0.6398,0.9541,-0.7645,0.8579,-0.709,0.7724,-0.3829,0.7794,-0.5938,0.7874,-0.6257,0.6494,-0.5869,0.733,-0.4007,0.5206,-0.6079,0.6371,-0.6951,0.6997,-0.4203,0.5159,-0.8796,0.9851,-0.8261,0.7862,-0.2868,0.7199,-0.8374,0.9058,-0.0445,0.4018,-0.6481,0.6654,-0.2084,0.8482,-0.707,0.4572,-0.3453,0.3987,-0.836,0.5804,-0.657,0.6593,-0.5888,0.6096,-0.7278,0.4853,-0.7026,0.3818,-0.7505,0.3618,-0.3591,0.4623,-0.5536,0.7439,-0.6537,1.0025,-0.6782,0.5885,-0.4838,0.9712,-0.6068,0.8367,-0.9428,0.5119,-0.7297,0.9912,-0.4652,0.4393,-0.8466,0.9958,-0.482,0.414,-0.6624,0.9989,-0.1613,0.9456,-0.7655,0.8089,-0.9316,0.6075,-0.525,0.3926,-0.6899,0.6454,-0.9529,0.7939,-0.235,0.7582,-0.5537,0.8137,-0.8247,0.8406,-0.4085,0.9414,-0.5191,0.5001,-0.593,0.7017,-0.9101,0.5104,-0.6105,0.3011,-0.6344,0.5979,-0.6482,0.6185,-1.0212,0.5915,-0.8,0.8387,-0.4483,0.492,-0.611,0.4961,-0.8405,0.6453,-0.5304,0.3217,-0.6043,0.5337,-0.4025,0.3819,-0.446,0.5114,-0.406,0.909,-0.6831,0.647,-0.6998,0.3355,-0.1813,0.2893,-0.5919,0.3296,-0.2828,0.2735,-0.3295,0.847,-0.3818,0.9678,-0.4754,0.9116,-0.6843,0.7454,-0.4259,1.0046,-0.3586,0.9821,-0.493,0.3625,-0.1762,0.4524,-0.4111,0.191,-0.2348,0.3128,-0.5783,0.3231,-0.5348,0.9007,-0.501,0.5888,-0.5972,0.6387,-0.7955,0.6015,-0.8898,0.6263,-0.9167,0.4362,-0.7118,0.2677,-0.2948,0.7214,-0.6295,0.4068,-0.1684,0.3882,-0.2731,0.26,-0.2797,0.8549,-0.6919,0.9043,-0.7085,0.5377,-0.6176,0.9131,-0.3749,0.7835,-0.97,0.3422,-0.5884,0.2925,-0.672,0.5414,-0.415,0.6857,-0.7259,0.6961,-0.7203,0.6277,-0.822,0.8808,-0.4463,0.8289,-0.7494,0.8243,-0.6083,0.6871,-0.8158,0.4248,-0.7582,0.4679,-0.55,0.2332,-0.2425,0.6088,-0.1914,0.43,-0.4707,0.2261,-0.3759,0.7982,-0.9173,0.6271,-0.5293,0.5401,-0.4027,0.2835,-0.4022,0.8428,-0.9528,0.4367,-0.2706,0.2895,-0.6046,0.4191,-0.163,0.5595,-0.355,0.4306,-0.3806,0.8885,-0.4255,0.7677,-0.7238,0.8871,-0.5754,0.4531,-0.4548,1.0005,-0.6246,0.8037,-0.6717,0.2092,-0.5118,0.4388,-0.2002,0.3962,-0.3666,0.4316,-0.5464,0.4484,-0.485,0.9443,-0.4192,0.5176,-0.9049,0.5779,-0.9914,0.7818,-0.1228,0.6786,-0.7185,0.3258,-0.7249,0.25,-0.4716,0.4084,-0.5993,0.4273,-0.3001,0.351,-0.5465,0.6236,-0.4448,0.4493,-0.9672,0.5462,-0.3637,0.6883,-0.7724,0.6745,-0.6186,0.9119,-1.0113,0.4597,-0.5351,0.4689,-0.3502,0.5626,-0.4509,0.4074,-0.3443,0.5607,-0.3344,0.3128,-0.6087,0.9041,-0.7351,0.4022,-0.4819,0.5919,-0.6098,0.5194,-0.6492,0.4527,-0.8133,0.4905,-0.4768,0.6853,-0.2006,0.5822,-0.2256,0.5254,-0.4176,0.2754,-0.447,0.7943,-0.5495,0.6156,-0.4889,0.6381,-0.4215,0.3895,-0.4594,0.8993,-0.9671,0.524,-0.6949,0.2964,-0.3853,0.2473,-0.3597,0.2814,-0.5139,0.1751,-0.4372,0.8631,-0.785,0.8599,-0.5175,0.3274,-0.4809,0.5633,-0.3563,0.7778,-0.7247,0.7577,-0.6448,0.4699,-0.6837,0.3669,-0.6049,0.2975,-0.4097,0.6314,-0.5083,0.377,-0.3278,0.6071,-0.9151,0.3967,-0.514,0.7121,-0.3923,0.6041,-0.5189,0.9436,-0.4991,0.4648,-0.2645,0.3845,-0.3267,0.4355,-0.3252,0.3332,-0.2047,0.423,-0.3028,0.9456,-0.348,0.3259,-0.755,0.5715,-0.6338,0.3227,-0.4225,0.919,-0.2806,0.9208,-0.4423,0.4507,-0.5124,0.3675,-0.4214,0.2112,-0.3375,0.2548,-0.4386,0.1987,-0.2889,0.5288,-0.6069,0.9103,-0.6095,0.5276,-0.4683,0.4083,-0.3425,0.5043,-0.4275,0.4947,-0.7829,0.3285,-0.498,0.2504,-0.6326,0.3617,-0.2848,0.3175,-0.4085,0.4135,-0.4868,0.722,-0.6194,0.5762,-0.493,0.6324,-0.189,0.4812,-0.3151,0.472,-0.3804,0.36,-0.4611,0.4964,-0.7497,0.2984,-0.3818,0.4784,-0.4562,0.311,-0.3183,0.537,-0.3237,0.4573,-0.8659,0.2728,-0.8024,0.5142,-0.5263,0.9428,-0.5746,0.8633,-0.6477,0.9719,-0.7261,0.6152,-0.7055,0.6866,-0.8283,0.5089,-0.633,0.5062,-0.9946,0.4971,-0.7417,0.629,-0.8909,0.6247,-0.8868,0.6616,-0.8143,0.5927,-0.9128,0.7231,-0.7679,0.7278,-0.4313,0.8733,-0.691,0.9086,-0.6098,0.7657,-0.9541,0.6967,-0.9847,0.9538,-0.9262,0.9562,-0.8556,0.9558,-0.7686,0.8945,-0.7976,0.581,-0.9528,0.8637,-0.7586,0.3453,-0.9539,0.4658,-0.7094,0.7002,-0.9076,0.8893,-0.7454,0.977,-0.9473,0.7611,-0.7423,0.9491,-0.842,0.8543,-0.7483,0.8091,-0.6276,0.9264,-0.8642,0.6217,-0.6697,0.8167,-0.8806,0.8718,-0.8308,0.7236,-0.8901,0.4293,-0.9806,0.5967,-0.9749,0.9636,-0.8983,0.386,-0.8817,0.8252,-0.4188,0.7435,-0.8884,0.8511,-0.9344,0.7478,-0.8883,0.9505,-0.8832,0.5155,-0.876,0.3198,-0.8066,0.8575,-0.5853,0.7523,-0.8238,0.559,-0.9109,0.8338,-0.8191,0.717,-0.6702,0.8742,-0.8583,0.8329,-0.9553,0.8404,-0.609,0.7481,-0.6741,0.984,-0.98,0.9342,-0.5784,0.9926,-0.9546,0.9566,-0.6356,0.6963,-0.8092,0.6443,-0.6005,0.6406,-0.8844,0.6742,-0.9076,0.8284,-0.7351,0.5742,-0.3876,0.9766,-0.8097,0.7799,-0.8666,0.773,-0.9868,0.8737,-0.572,0.9231,-0.5027,0.7888,-1.0229,0.5036,-0.7106,0.6895,-0.6066,0.5682,-0.7939,0.9251,-1.0133,0.6402,-0.7322,0.7517,-0.8968,0.7968,-0.7437,0.388,-0.877,0.5436,-0.8962,0.4712,-0.6701,0.5567,-0.5069,0.4482,-0.7822,0.4635,-0.9966,0.8979,-0.3075,0.522,-0.4373,0.5017,-0.6255,0.6011,-0.4389,0.8562,-0.6109,0.9917,-0.8323,0.7114,-0.9324,0.7341,-0.7494,0.8345,-0.5985,0.7533,-0.9001,0.9572,-0.6625,0.6127,-0.8539,0.8077,-0.8287,0.4269,-0.4479,0.4383,-0.638,0.9658,-0.9785,0.8545,-0.9607,0.6069,-0.7589,1.0104,-0.6225,0.7202,-0.6715,0.9022,-0.9109,0.7348,-0.6785,0.5313,-0.3759,0.8017,-0.8495,0.7522,-0.4903,0.9191,-0.668,0.8514,-0.5676,0.4822,-0.9837,0.6353,-0.537,1.0036,-0.835,0.8478,-0.7762,0.5083,-0.4789,0.5178,-0.9769,0.8475,-0.7235,0.8338,-0.7138,0.5711,-0.597,0.8619,-0.8231,0.8356,-0.4348,0.9458,-0.4415,0.5024,-0.6376,0.8122,-0.9888,0.8824,-0.9114,0.8202,-0.9326,0.6885,-0.5397,0.7237,-0.6122,0.5056,-0.8054,0.4501,-0.8575,0.9417,-0.9348,1.0153,-0.7132,0.9699,-0.4556,1.013,-0.689,0.6696,-1.0055,0.4875,-0.4369,0.5601,-0.7319,0.7759,-0.2747,0.4305,-0.7004,0.6496,-0.8818,0.8779,-0.9111,0.9751,-0.7599,0.8953,-0.683,1.0077,-0.5401,0.5615,-0.8316,0.5143,-0.3903,0.6619,-0.7423,0.8366,-0.3225,0.6574,-0.816,0.7088,-0.5026,0.8302,-0.6719,0.802,-0.8833,0.8674,-0.7829,0.7469,-0.9473,0.7127,-0.9014,0.9785,-0.7449,0.8026,-0.7211,0.6007,-0.8392,0.9732,-0.3717,0.6732,-0.6468,0.8591,-0.772,0.8979,-0.7259,1.0149,-0.6201,0.9192,-0.881,0.7012,-0.9815,0.3472,-0.4772,0.3749,-0.3563,0.2623,-0.2641,0.1326,-0.1982,0.1244,-0.2217,0.1339,-0.1411,0.1257,-0.1423,0.1912,-0.3113,0.2576,-0.1844,0.156,-0.2375,0.2887,-0.1787,0.2551,-0.1982,0.1438,-0.1763,0.143,-0.1654,0.0753,-0.0455,0.05,-0.0682,0.0322,-0.0377,0.1996,-0.2189,0.0969,-0.1072,0.1961,-0.1711,0.1292,-0.158,0.1376,-0.2067,0.1486,-0.1912,0.1522,-0.0656,0.1282,-0.0918,0.0412,-0.0982,0.0747,-0.0304,0.0334,-0.0412,0.2179,-0.2255,0.066,-0.1124,0.111,-0.1094,0.0829,-0.063,0.1053,-0.1678,0.1048,-0.1445,0.0732,-0.0453,0.0636,-0.0812,0.0258,-0.0293,0.0404,-0.0314,0.0207,-0.0886,0.0823,-0.0596,0.068,-0.0686,0.0478,-0.0466,0.0347,-0.0225,0.0088,-0.0151,0.0047,-0.004,0.0019,-0.0017,0.0008,-0.0012,0.0005,-0.0005,0.0003,-0.0003,0.0001,-0.0001,0,0,0,0]
    const positiveValues = [];
    const negativeValues = [];

    // Calculate all positive, negative values
    for (let i = 0; i < original_data.length - 2; i += 7) {
      // Add full-size bars to positive values
      // Add 1/5-size bars to negative values
      if (original_data[i] >= 0) {
        positiveValues.push(original_data[i]);
        negativeValues.push(-(original_data[i] + original_data[i + 2]) / 10);
      } else {
        positiveValues.push(-(original_data[i] + original_data[i + 2]) / 2);
        negativeValues.push(original_data[i] / 2.5);
      }
    }

    // Get empty labels
    const xValues = original_data
      .slice(0, original_data.length / 8)
      .map((value) => '');

    // Get chart element
    const ctx = document.getElementById('playback-chart').getContext('2d');

    // Create color gradient
    const gradientStroke = ctx.createLinearGradient(
      this.state.songPlayerPixelWidth *
        (this.state.currentSongAudio.currentTime /
          this.state.currentSongAudio.duration),
      0,
      this.state.songPlayerPixelWidth *
        (this.state.currentSongAudio.currentTime /
          this.state.currentSongAudio.duration) +
        10,
      0
    );
    gradientStroke.addColorStop(0, '#f50');
    gradientStroke.addColorStop(1, '#CCCCCC');

    // Create data objects
    var positiveData = {
      data: positiveValues,
      backgroundColor: gradientStroke,
      // backgroundColor: 'rgb(255, 99, 132)',
    };

    var negativeData = {
      data: negativeValues,
      backgroundColor: gradientStroke,
      // backgroundColor: 'rgb(255, 99, 132)',
    };

    // Create bar chart
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [positiveData, negativeData],
      },
      options: {
        tooltips: {enabled: false},
        hover: {mode: null},
        animation: {
          duration: 0,
          onProgress: () => {},
          onComplete: () => {},
        },
        scales: {
          xAxes: [
            {
              display: false,
              stacked: true,
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
              },
              ticks: {
                display: false, //this will remove only the label
              },
            },
          ],
          yAxes: [
            {
              stacked: false,
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
  }

  // Update colors on playback waveform bar chart
  updateWaveformColor() {
    console.log('update waveform color called');
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillRect(
      this.state.songPlayerPixelWidth *
        (this.state.currentSongAudio.currentTime /
          this.state.currentSongAudio.duration),
      0,
      this.state.songPlayerPixelWidth *
        (this.state.currentSongAudio.currentTime /
          this.state.currentSongAudio.duration) +
        10,
      0
    );
    const gradientStroke = ctx.createLinearGradient(
      this.state.songPlayerPixelWidth *
        (this.state.currentSongAudio.currentTime /
          this.state.currentSongAudio.duration),
      0,
      this.state.songPlayerPixelWidth *
        (this.state.currentSongAudio.currentTime /
          this.state.currentSongAudio.duration) +
        10,
      0
    );
    gradientStroke.addColorStop(0, '#f50');
    gradientStroke.addColorStop(1, '#999999');
  }

  // Render App component
  render() {
    const {playButtonState} = this.state;
    const {
      currentTime,
      currentTimeMMSS,
      durationMMSS,
      artist_name,
      song_name,
      date_posted,
      tag,
      song_art_url,
    } = this.state.currentSongObj;
    const currentSongAudio = this.state.currentSongAudio || 60;
    const length = currentSongAudio.duration || 60;
    return (
      <div>
        <div className='nav-bar'></div>
        {/* <button id='next-song-btn' onClick={this.playNextFromQueue}>
          Next Song
        </button> */}
        <div id='playbackCenter' className='outer-player-panel'>
          <div
            className='inner-player-panel'
            style={{
              background: `linear-gradient(
                135deg,
                rgb${this.state.currentSongObj.background_light} 0%,
                rgb${this.state.currentSongObj.background_dark} 100%`,
            }}
          >
            <div className='player-head'>
              <div
                className='play-button-wrapper'
                onClick={() => {
                  if (playButtonState === 'play') {
                    this.playSong();
                  } else {
                    this.pauseSong();
                  }
                }}
              >
                <div className={playButtonState + '-button'}></div>
              </div>
              <div className='artist-name-container'>
                <span className='artist-name fit-width-to-contents'>
                  {artist_name}
                </span>
              </div>
              <div className='song-name-container'>
                <span className='song-name fit-width-to-contents'>
                  {song_name}
                </span>
              </div>
              <div className='date-posted-container'>
                <div className='date-posted'>{date_posted}</div>
              </div>
              <div className='tags-container'>
                <div className='tags fit-width-to-contents'>{tag}</div>
              </div>
            </div>
            <div className='album-art'>
              <img src={song_art_url} alt='' className='album-art' />
            </div>
            <div className='song-player'>
              <div className='current-playback-timer-container'>
                <div className='current-playback-timer fit-width-to-contents'>
                  {currentTimeMMSS}
                </div>
              </div>
              <div className='total-song-length-container'>
                <div className='total-song-length'>{durationMMSS}</div>
              </div>
              <div
                className='waveform-container'
                ref={(divElement) => (this.divElement = divElement)}
              >
                <canvas
                  id='playback-chart'
                  ref='canvas'
                  className='waveform'
                ></canvas>
              </div>
              <div className='playback-slider-container'>
                <input
                  type='range'
                  min='0'
                  max={length}
                  value={currentTime}
                  onChange={this.handleSliderChange}
                  className='playback-slider'
                  style={{
                    background: `linear-gradient(
                      90deg, 
                      #f50 ${(this.state.currentSongAudio.currentTime /
                        this.state.currentSongAudio.duration) *
                        100}%, 
                      #999999 0%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.querySelector('#app'));