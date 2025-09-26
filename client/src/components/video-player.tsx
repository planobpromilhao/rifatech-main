import { useState } from "react";

export function VideoPlayer() {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    // In a real implementation, this would start the video
    console.log('Video interaction - would start actual video playback here');
  };

  return (
    <div className="max-w-4xl mx-auto mb-8 relative">
      <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
        <img 
          src="https://images.converteai.net/5628caef-e8a9-4caf-a362-0ca479569e53/players/68d4a39b3776360127869bdb/thumbnail.jpg" 
          alt="Video do Dudu" 
          className="w-full h-full object-cover"
          data-testid="video-thumbnail"
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
