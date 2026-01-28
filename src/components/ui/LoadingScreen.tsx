import React, { useState, useEffect, useRef } from 'react';
import { LoadingIndicator } from '@/components/application/loading-indicator/loading-indicator';

interface LoadingScreenProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, videoSrc = '/assets/video/intro.MP4' }) => {
  const [showLoading, setShowLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Preload video in background
    if (videoRef.current) {
      const video = videoRef.current;
      video.load();
    }

    // Start fade out at 3 seconds (1 second fade duration)
    const fadeOutTimer = setTimeout(() => {
      setIsFading(true);
    }, 3000);

    // Complete loading screen at 4 seconds (after 1 second fade)
    const completeTimer = setTimeout(() => {
      setShowLoading(false);
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, videoSrc]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: showLoading ? 'auto' : 'none' }}
    >
      {/* Loading Indicator - shown for 3 seconds */}
      {showLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-4">
            <LoadingIndicator type="dot-circle" size="md" />
          </div>
        </div>
      )}
      
      {/* Video - loads in background, will play in hero section */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
};
