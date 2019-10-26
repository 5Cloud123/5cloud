import React from 'react';
import styles from '../styles/Playlist.module.css';

var Playlist = props => {
  const { like, playListPopup } = props;
  return (
    <div className={styles.playlistContainer}>
      <img
        className={styles.img}
        onClick={like}
        id={styles.like}
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiMyMjIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
        width="24"
        height="24"
        alt="submit"
      />
      <button
        className={styles.button}
        onClick={() => {
          document.querySelector(styles.playlistButton).style.display = 'block';
        }}
      >
        {
          <svg id={styles.playlistButton}>
            <path
              fill="#333"
              className="playbackSoundBadge__queueIcon"
              d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"
              width="24"
              height="24"
            ></path>
          </svg>
        }
      </button>
    </div>
  );
};

export default Playlist;
