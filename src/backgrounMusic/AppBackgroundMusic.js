import Sound from "react-sound";
import music from "../resources/music/Night.mp3";
const BoopButton = () => {
  return (
    <Sound
      url={music}
      playStatus={Sound.status.PLAYING}
      //   playFromPosition={300 /* in milliseconds */}
      //   onLoading={this.handleSongLoading}
      //   onPlaying={this.handleSongPlaying}
      //   onFinishedPlaying={this.handleSongFinishedPlaying}
    />
  );
};

export default BoopButton;
