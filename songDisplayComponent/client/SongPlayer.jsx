export default class SongPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songPlayerPixelWidth: 0,
    };
  }

  componentDidMount() {
    // Save component's width
    const songPlayerPixelWidth = this.divElement.clientWidth;
    this.setState({songPlayerPixelWidth});
    // this.drawWaveform();
  }

  componentDidUpdate() {
    // Add event listener to draw waveform when song is loaded
    this.props.currentSongAudio.addEventListener('loadedmetadata', () => {
      // Re-draw waveform
      this.drawWaveform();
    });
  }

  // Draw playback waveform bar chart
  drawWaveform() {
    const data = this.props.currentSongObj.waveform_data;

    // Get chart element
    const ctx = document.getElementById('playback-chart').getContext('2d');

    console.log(this.state.songPlayerPixelWidth);
    console.log(this.props.currentSongAudio.duration);
    console.log(
      this.state.songPlayerPixelWidth *
        (this.props.currentSongAudio.currentTime /
          this.props.currentSongAudio.duration)
    );

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
      // backgroundColor: 'rgb(255, 99, 132)',
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
    return (
      <div className='song-player'>
        <div className='current-playback-timer-container'>
          <div className='current-playback-timer fit-width-to-contents'>
            {this.props.currentTimeMMSS}
          </div>
        </div>
        <div className='total-song-length-container'>
          <div className='total-song-length'>{this.props.durationMMSS}</div>
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
            {this.props.comments.map((comment) => {
              return (
                <div
                  className='user-image'
                  style={{
                    left:
                      this.props.songPlayerPixelWidth *
                      (comment.time_stamp /
                        this.props.currentSongAudio.duration),
                    backgroundImage: this.props.userImages[
                      comment.time_stamp % this.props.userImages.length
                    ],
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className='playback-slider-container'>
          <input
            type='range'
            min='0'
            max={length}
            value={this.props.currentTime}
            onChange={this.props.handleSliderChange}
            className='playback-slider'
            style={{
              background: `linear-gradient(
                      90deg, 
                      #f50 ${(this.props.currentSongAudio.currentTime /
                        this.props.currentSongAudio.duration) *
                        100}%, 
                      #999999 0%)`,
            }}
          />
        </div>
        <div className='expanded-comments-container'>
          <div className='expanded-comment'></div>
        </div>
      </div>
    );
  }
}
