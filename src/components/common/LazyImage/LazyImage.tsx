import React, { useEffect, useRef, useState } from 'react';

import './LazyImage.scss';

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string | null;
  alt: string;
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  wrapperClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc = 'https://via.placeholder.com/300x200?text=Image+Not+Found',
  width = '100%',
  height = 'auto',
  radius = 0,
  wrapperClassName,
  onLoad,
  onError,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const styleVar = {
    ['--lazy-radius' as string]: typeof radius === 'number' ? `${radius}px` : radius,
  } as React.CSSProperties;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    setIsLoading(false);
    onError?.(e);
  };

  const wrapperStyle: React.CSSProperties = {
    ...styleVar,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div ref={containerRef} className={`lazy-image ${wrapperClassName ?? ''}`} style={wrapperStyle}>
      {isLoading && <div className="lazy-image__skeleton" aria-hidden />}

      {isInView && (
        <img
          src={isError ? fallbackSrc : src ? src : fallbackSrc}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={`lazy-image__img ${!isLoading && !isError ? 'is-loaded' : ''}`}
          {...rest}
        />
      )}
    </div>
  );
};

export default LazyImage;
