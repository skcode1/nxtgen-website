import React from 'react';

interface LoadingIndicatorProps {
  type?: 'dot-circle' | 'spinner' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  type = 'dot-circle',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  if (type === 'dot-circle') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`${sizeClasses[size]} rounded-full bg-white animate-pulse`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-white border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};
