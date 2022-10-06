import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';
const onPlay = function (data) {
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player
  .setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
