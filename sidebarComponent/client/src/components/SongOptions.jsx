import React from 'react';
import style from './SongOptions.css';

let SongOptions = function(props) {
  return (
    <div className={style.container}>
      <button className={style['like-button']}>
        <img
          className={style.heart}
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+c3RhdHNfbGlrZXNfZ3JleTwvdGl0bGU+PHBhdGggZD0iTTEwLjgwNSAzYy0yLjAyIDAtMi44MDQgMi4zNDUtMi44MDQgMi4zNDVTNy4yMTMgMyA1LjE5NiAzQzMuNDk0IDMgMS43NDggNC4wOTYgMi4wMyA2LjUxNGMuMzQ0IDIuOTUzIDUuNzI1IDYuNDc5IDUuOTYzIDYuNDg3LjIzOC4wMDggNS43MzgtMy43MjIgNS45ODgtNi41QzE0LjE4OCA0LjIwMSAxMi41MDcgMyAxMC44MDUgM3oiIGZpbGw9IiMyMjIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
        />
      </button>
      <button className={style['options-button']}>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iNCIgdmlld0JveD0iMCAwIDE0IDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPm1vcmU8L3RpdGxlPjxnIGZpbGw9IiMyMjIiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48Y2lyY2xlIGN4PSI3IiBjeT0iMiIgcj0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMiIgcj0iMiIvPjwvZz48L3N2Zz4=" />
      </button>
    </div>
  );
};

export default SongOptions;
