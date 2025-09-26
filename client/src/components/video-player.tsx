import { useState, useRef } from "react";
import videoFile from "@assets/Dudu Juntos pela Helena_1758924211856.mp4";

export function VideoPlayer() {
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-8 relative">
      <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
        <video 
          ref={videoRef}
          src={videoFile}
          className="w-full h-full object-cover"
          controls={!showOverlay}
          preload="metadata"
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
      </div>
    </div>
  );
}
