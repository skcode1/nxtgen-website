import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  reverse?: boolean;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  imageClassName?: string;
};

export function LogoCloud({
  className,
  logos,
  reverse = true,
  speed = 80,
  speedOnHover = 25,
  gap = 42,
  imageClassName,
  ...props
}: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={gap} reverse={reverse} speed={speed} speedOnHover={speedOnHover}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className={cn(
              "pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert",
              imageClassName
            )}
            height={logo.height || "auto"}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width || "auto"}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
