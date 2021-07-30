import {randomColor} from './randomId';

function VideoBox({ text, style }) {
    let color = randomColor(text[0]);
    return (
      <div
        style={{
          // backgroundColor: `#${text.substring(0, 6)}`,
          backgroundColor: color,
          width: "180px",
          height: "120px",
          borderRadius: `20px`,
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  export default VideoBox;