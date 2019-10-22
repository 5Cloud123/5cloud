import UserComment from './UserComment';

export default class SongPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songPlayerPixelWidth: 0,
    };

    // Save some example images for user comments
    this.userImages = [
      'url(https://i1.sndcdn.com/avatars-000695845801-jyfa5g-t50x50.jpg)',
      'url(https://i1.sndcdn.com/avatars-000274853469-3mk2s7-t50x50.jpg)',
      'url(https://i1.sndcdn.com/avatars-000469956462-p8hr59-t50x50.jpg)',
      'url(https://i1.sndcdn.com/avatars-000228186996-vcp1u4-t50x50.jpg)',
      'url(https://i1.sndcdn.com/avatars-000286698547-9rrb5v-t50x50.jpg)',
      'url(https://i1.sndcdn.com/avatars-000310841632-oqxf4c-t50x50.jpg)',
      'url(https://i1.sndcdn.com/avatars-000271547302-69b2fg-t50x50.jpg)',
    ];
  }

  componentDidMount() {
    // Save component's width
    const songPlayerPixelWidth = this.divElement.clientWidth;
    this.setState({songPlayerPixelWidth});
  }

  componentDidUpdate() {
    if (this.props.currentSongAudio.duration) {
      this.drawWaveform();
    } else {
      // Add event listener to draw waveform when song is loaded
      this.props.currentSongAudio.addEventListener('loadedmetadata', () => {
        // Re-draw waveform
        this.drawWaveform();
      });
    }
  }

  // Draw playback waveform bar chart
  drawWaveform() {
    const data = this.props.currentSongObj.waveform_data;

    // Get chart element
    const ctx = document.getElementById('playback-chart').getContext('2d');

    // Create color gradient
    const gradientStroke = ctx.createLinearGradient(
      this.state.songPlayerPixelWidth *
        (this.props.currentSongAudio.currentTime /
          this.props.currentSongAudio.duration),
      0,
      this.state.songPlayerPixelWidth *
        (this.props.currentSongAudio.currentTime /
          this.props.currentSongAudio.duration) +
        10,
      0
    );
    gradientStroke.addColorStop(0, '#f50');
    gradientStroke.addColorStop(1, '#CCCCCC');

    // Create data objects
    var positiveData = {
      data: data.positiveValues,
      backgroundColor: gradientStroke,
    };

    var negativeData = {
      data: data.negativeValues,
      backgroundColor: gradientStroke,
    };

    // Create bar chart
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.xValues,
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

  render() {
    // Destructure state, props
    const {
      currentTimeMMSS,
      durationMMSS,
      comments,
      currentSongAudio,
      handleSliderChange,
      currentTime,
    } = this.props;
    const {songPlayerPixelWidth} = this.state;

    return (
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
          <div className='user-comment-container'>
            {comments.map((comment) => {
              return (
                <UserComment
                  comment={comment}
                  currentSongAudio={currentSongAudio}
                  userImages={this.userImages}
                  songPlayerPixelWidth={songPlayerPixelWidth}
                  key={comment.time_stamp + comment.user_name}
                />
              );
            })}
          </div>
          <div className='playback-slider-container'>
            <input
              type='range'
              min='0'
              max={length}
              value={currentTime}
              onChange={handleSliderChange}
              className='playback-slider'
            />
          </div>
          <div className='hr-container'>
            <div className='hr'></div>
          </div>
        </div>
        <div className='expanded-comments-container'>
          <div className='expanded-comment'></div>
        </div>
      </div>
    );
  }
}
