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
