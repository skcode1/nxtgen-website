"use client";

import React, { useEffect, useRef, useState } from "react";

type SliderItem = {
  src: string;
  alt?: string;
  href?: string;
};

type ImageAutoSliderProps = {
  images?: string[];
  items?: SliderItem[];
  itemClassName?: string;
  imageClassName?: string;
  reverse?: boolean;
};

export const ImageAutoSlider = ({
  images,
  items,
  itemClassName,
  imageClassName,
  reverse,
}: ImageAutoSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const fallbackImages = [
    "/assets/previous/1.JPG",
    "/assets/previous/2.JPG",
    "/assets/previous/3.JPG",
    "/assets/previous/4.JPG",
    "/assets/previous/5.jpg",
    "/assets/previous/6.jpg",
    "/assets/previous/7.jpg",
  ];

  const itemsToUse: SliderItem[] =
    items && items.length
      ? items
      : (images && images.length ? images : fallbackImages).map((src, index) => ({
          src,
          alt: `Gallery image ${index + 1}`,
          href: undefined,
        }));

  const duplicatedItems = Array.from({ length: 10 }, () => itemsToUse).flat();

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(media.matches);
    handleChange();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    if (typeof media.addListener === "function") {
      media.addListener(handleChange);
      return () => media.removeListener(handleChange);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = isVisible && !reduceMotion;

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .infinite-scroll {
          animation: scroll-right 56s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }

        .reverse-scroll {
          animation-direction: reverse;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      <div ref={containerRef} className="w-full relative overflow-hidden flex items-center justify-center">

        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="scroll-container w-full">
            <div
              className={`infinite-scroll flex gap-6 w-max ${reverse ? "reverse-scroll" : ""}`}
              style={{ animationPlayState: shouldAnimate ? "running" : "paused" }}
            >
              {duplicatedItems.map((item, index) => (
                <div
                  key={index}
                  className={`image-item flex-shrink-0 rounded-xl overflow-hidden shadow-2xl ${
                    itemClassName ||
                    "w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem]"
                  }`}
                >
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="block h-full w-full">
                      <img
                        src={item.src}
                        alt={item.alt || `Gallery image ${(index % itemsToUse.length) + 1}`}
                        className={`w-full h-full ${imageClassName || "object-cover"}`}
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt || `Gallery image ${(index % itemsToUse.length) + 1}`}
                      className={`w-full h-full ${imageClassName || "object-cover"}`}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
