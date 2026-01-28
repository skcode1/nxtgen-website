import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between w-full p-6 overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-purple-400/90 text-primary-foreground",
        red: "bg-purple-400/90 text-primary-foreground",
        blue: "bg-purple-400/90 text-primary-foreground",
        gray: "bg-purple-400/90 text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  popupContent?: string[];
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, href, imgSrc, imgAlt, popupContent, ...props }, ref) => {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const cardAnimation = {
      hover: {
        scale: 1.02,
        transition: { duration: 0.3 },
      },
    };

    const imageAnimation = {
      hover: {
        scale: 1.1,
        rotate: 3,
        x: 10,
        transition: { duration: 0.4, ease: "easeInOut" },
      },
    };
    
    const arrowAnimation = {
        hover: {
            x: 5,
            transition: { duration: 0.3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" as const },
        }
    }

    const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (popupContent && popupContent.length > 0) {
        e.preventDefault();
        setIsPopupOpen(true);
      }
    };

    return (
      <>
        <motion.div
          className={cn(cardVariants({ variant, className }))}
          ref={ref}
          variants={cardAnimation}
          whileHover="hover"
          {...props}
        >
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <a
              href={href}
              onClick={handleLearnMoreClick}
              aria-label={`Learn more about ${title}`}
              className="mt-auto flex items-center text-sm font-semibold group-hover:underline cursor-pointer"
            >
              LEARN MORE
              <motion.div variants={arrowAnimation}>
                  <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </a>
          </div>
          
          <motion.img
            src={imgSrc}
            alt={imgAlt}
            className="absolute -right-8 -bottom-8 w-40 h-40 object-contain opacity-90 group-hover:opacity-100"
            variants={imageAnimation}
          />
        </motion.div>

        <AnimatePresence>
          {isPopupOpen && popupContent && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setIsPopupOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md rounded-2xl border border-white/10 bg-black/80 p-6 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-3 text-white/90">
                  {popupContent.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-purple-400 font-bold mt-1">•</span>
                      <p className="text-base leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
