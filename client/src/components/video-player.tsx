import { useState, useRef, useEffect } from "react";
import videoFile from "@assets/Dudu Juntos pela Helena_1758924211856.mp4";

export function VideoPlayer() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(pos * 100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto mb-8 relative">
      <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
        <video 
          ref={videoRef}
          src={videoFile}
          className="w-full h-full object-cover"
          controls={false}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          data-testid="video-player"
        />
        
        {showOverlay && (
          <div 
            className="video-overlay bg-black bg-opacity-65 rounded-xl border-4 border-white p-8 text-center cursor-pointer"
            onClick={handleOverlayClick}
            data-testid="video-overlay-click"
          >
            <h3 className="text-white text-2xl md:text-4xl font-bold mb-4">
              Seu vídeo já começou
            </h3>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 flex items-center justify-center">
                <i className="fas fa-volume-up text-white text-4xl blink"></i>
              </div>
            </div>
            <p className="text-white text-2xl md:text-4xl font-bold">
              Clique para ouvir
            </p>
          </div>
        )}

        {/* Barra de progresso personalizada */}
        {!showOverlay && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm font-medium min-w-[40px]">
                {formatTime(currentTime)}
              </span>
              
              <div 
                className="flex-1 h-2 bg-gray-600 rounded-full cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-150 group-hover:bg-blue-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <span className="text-white text-sm font-medium min-w-[40px]">
                {formatTime(duration)}
              </span>
              
              <button
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <i className="fas fa-play text-lg"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
