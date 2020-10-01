import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import YouTube from "react-youtube";
import CookieConsent from "./CookieConsent";
import Loader from "./Loader";

import "./styles.css";

const MemoizedYouTube = React.memo(YouTube);

export default function App() {
  const videoRef = useRef();
  const containerRef = useRef();

  const [playing, setPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const opts = useMemo(
    () => ({
      height,
      width,
      playerVars: {
        autoplay: 0
      }
    }),
    [height, width]
  );

  useEffect(() => {
    const { width, height } = containerRef.current.getBoundingClientRect();
    setHeight(height);
    setWidth(width);
  }, [height, width]);

  const onReady = useCallback(
    ({ target }) => {
      videoRef.current = target;
      setVideoLoaded(true);
    },
    [videoRef]
  );

  const play = () => {
    const video = videoRef.current;

    try {
      video.unMute();
      video.setVolume(100);
    } catch {
      console.error("Unable to unmute.");
    }
    try {
      video.playVideo();
    } catch {
      console.error("Unable to play video.");
    }

    setPlaying(true);
  };

  useEffect(() => {
    if (playing) {
      window.document.title = window.document.title.replace("roll", "rickroll");
    }
  }, [playing]);

  return (
    <div className="App" ref={containerRef}>
      <div style={{ opacity: playing ? 1 : 0 }}>
        {width !== 0 && height !== 0 && (
          <MemoizedYouTube
            videoId="dQw4w9WgXcQ"
            opts={opts}
            onReady={onReady}
          />
        )}
      </div>
      <div
        className="CookieOverlay"
        style={{ opacity: playing ? 0 : 1 }}
        onClick={play}
      >
        {videoLoaded ? <CookieConsent /> : <Loader />}
      </div>
    </div>
  );
}
