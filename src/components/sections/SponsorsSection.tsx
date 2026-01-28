import { useEffect, useState } from "react";
import ShinyText from "@/components/ui/ShinyText";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { fetchTable } from "@/lib/supabaseData";
import { getSupabaseClient } from "@/lib/supabaseClient";

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState<{
    id: string;
    name: string;
    logo_url?: string | null;
    website_url?: string | null;
  }[]>([]);

  useEffect(() => {
    let isMounted = true;
    const supabase = getSupabaseClient();
    let channel: ReturnType<NonNullable<typeof supabase>["channel"]> | null = null;

    const loadData = async () => {
      const sponsorsData = await fetchTable<{
        id: string;
        name: string;
        logo_url?: string | null;
        website_url?: string | null;
      }>(
        "sponsors",
        "sort_order"
      );
      if (sponsorsData && isMounted) setSponsors(sponsorsData);
    };
    loadData();

    if (supabase) {
      channel = supabase
        .channel("sponsors-live")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "sponsors" },
          () => {
            loadData();
          }
        )
        .subscribe();
    }

    return () => {
      isMounted = false;
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  if (sponsors.length === 0) {
    return null;
  }

  const logoItems = sponsors.map((s) => ({
    src: s.logo_url || "/assets/logo/logo.png",
    alt: s.name || "Sponsor logo",
    href: s.website_url || undefined,
  }));

  return (
    <section id="sponsors" className="relative pt-16 md:pt-20 pb-5 px-4">
      <div className="w-full">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-center mb-8 md:whitespace-nowrap">
          <ShinyText
            text="SPONSORS"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            className="block"
          />
        </h2>
        <div className="w-full relative space-y-6">
          <ImageAutoSlider
            items={logoItems}
            itemClassName="w-44 h-28 md:w-[13.5rem] md:h-32 lg:w-[21.33rem] lg:h-40"
            imageClassName="object-contain p-4"
          />
          <ImageAutoSlider
            items={logoItems}
            itemClassName="w-44 h-28 md:w-[13.5rem] md:h-32 lg:w-[21.33rem] lg:h-40"
            imageClassName="object-contain p-4"
            reverse
          />
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
