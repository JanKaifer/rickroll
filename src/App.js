import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CookieConsent from "./CookieConsent";
import Loader from "./Loader";

import "./styles.css";

export default function App() {
  const videoRef = useRef();

  const [playing, setPlaying] = useState(false);

  const onPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const play = () => {
    if (videoRef.current !== null) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (playing) {
      window.document.title = "Rick Roll 'D";
    }
  }, [playing]);

  return (
    <div className="App">
      <div>
        <video
          ref={videoRef}
          src="/assets/RickRoll.mp4"
          onPlay={onPlay}
          autoPlay={false}
        />
      </div>
      <CookieConsent show={!playing} onClick={play} />
    </div>
  );
}
