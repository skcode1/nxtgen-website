import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { fetchTable } from "@/lib/supabaseData";

type VentureRecord = {
  id: string;
  title?: string | null;
  image_url?: string | null;
  sort_order?: number | null;
};

const GallerySection = () => {
  const [ventures, setVentures] = useState<VentureRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const venturesData = await fetchTable<VentureRecord>("ventures", "sort_order");
      if (venturesData) setVentures(venturesData);
    };
    loadData();
  }, []);

  const ventureImages = ventures.map(v => v.image_url).filter(Boolean) as string[];

  return (
    <section id="gallery" className="relative min-h-[70vh] md:min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:whitespace-nowrap">
            <ShinyText
              text="Our Previous Ventures"
              speed={2}
              delay={0}
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              className="block"
            />
          </h2>
        </motion.div>
      </div>

      <div className="w-full relative">
        <ImageAutoSlider images={ventureImages} />
      </div>
    </section>
  );
};

export default GallerySection;
