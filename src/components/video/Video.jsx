import { useState, useRef } from "react";
import videoSample from "../../assets/video/sample-video.mp4";
import thumbnail from "../../assets/video/thumbnail.png";
import {
  FaPlay,
  FaPause,
  FaVolumeHigh,
  FaVolumeLow,
  FaVolumeXmark,
} from "react-icons/fa6";
import { GoScreenFull } from "react-icons/go";
import PlayIcon from "../../assets/images/play-icon.png";
import styles from "./Video.module.scss";

const Video = () => {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = e => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    videoRef.current.muted = false;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = e => {
    const newTime = e.target.value;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setVolume(1);
    } else {
      videoRef.current.muted = true;
      setVolume(0);
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (wrapperRef.current.requestFullscreen) {
        wrapperRef.current.requestFullscreen();
      } else if (wrapperRef.current.mozRequestFullScreen) {
        wrapperRef.current.mozRequestFullScreen();
      } else if (wrapperRef.current.webkitRequestFullscreen) {
        wrapperRef.current.webkitRequestFullscreen();
      } else if (wrapperRef.current.msRequestFullscreen) {
        wrapperRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  return (
    <div
      className={styles["video-wrapper"]}
      onDoubleClick={toggleFullScreen}
      ref={wrapperRef}>
      <video
        className={styles["video-player"]}
        loop
        muted
        ref={videoRef}
        poster={thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}>
        <source
          src={videoSample}
          type="video/mp4"
        />
      </video>
      {!hasPlayed ? (
        <div
          className={styles["starter-overlay"]}
          onClick={() => {
            handlePlayPause();
            setHasPlayed(true);
          }}>
          <img
            src={PlayIcon}
            alt="play icon"
          />
        </div>
      ) : null}
      <div
        className={
          videoRef.current?.paused && hasPlayed
            ? styles["video-overlay-paused"]
            : styles["video-overlay"]
        }
        onClick={handlePlayPause}>
        <div
          className={styles.controls}
          onClick={e => e.stopPropagation()}>
          <div className={styles.col1}>
            <button
              className={styles["play-btn"]}
              onClick={handlePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
          <div className={styles.col2}>
            <div className={styles.inputs}>
              <div className={styles["volume-wrapper"]}>
                {volume > 0.6 ? (
                  <FaVolumeHigh
                    className={styles["volume-icon"]}
                    onClick={toggleMute}
                  />
                ) : null}
                {volume < 0.6 && volume > 0 ? (
                  <FaVolumeLow
                    className={styles["volume-icon"]}
                    onClick={toggleMute}
                  />
                ) : null}
                {volume === 0 ? (
                  <FaVolumeXmark
                    className={styles["volume-icon"]}
                    onClick={toggleMute}
                  />
                ) : null}

                <input
                  id="volume"
                  className={styles.volume}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
              <input
                id="video-range"
                className={styles["video-range"]}
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
              />
            </div>
            <div className={styles.time}>
              <span id="current">
                {Math.floor(currentTime / 60)}:
                {("0" + Math.floor(currentTime % 60)).slice(-2)}
              </span>
              <span
                id="divider"
                className={styles.divider}>
                /
              </span>
              <span id="total">
                {Math.floor(duration / 60)}:
                {("0" + Math.floor(duration % 60)).slice(-2)}
              </span>
            </div>
            <div
              className={styles.fullscreen}
              onClick={toggleFullScreen}>
              <GoScreenFull
                id="fs-icon"
                styles={styles["fs-icon"]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
