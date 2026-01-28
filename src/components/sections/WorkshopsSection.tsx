import { useEffect, useState } from "react";
import { ElitePlanCard } from "@/components/ui/elite-plan-card";
import ShinyText from "@/components/ui/ShinyText";
import { fetchTable } from "@/lib/supabaseData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type WorkshopRecord = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url?: string | null;
  link_url?: string | null;
  highlights?: string[] | null;
  sort_order?: number | null;
};

const WorkshopsSection = () => {
  const [workshops, setWorkshops] = useState<WorkshopRecord[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopRecord | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const workshopsData = await fetchTable<WorkshopRecord>("workshops", "sort_order");
      if (workshopsData) setWorkshops(workshopsData);
    };
    loadData();
  }, []);

  const workshopList = workshops
    .filter(item => (item.image_url ?? "").trim().length > 0)
    .slice(0, 3);

  if (workshopList.length === 0) {
    return null;
  }

  return (
    <section id="workshops" className="relative pt-16 md:pt-20 pb-0 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-4 md:whitespace-nowrap">
          <ShinyText
            text="Workshops"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            className="block"
          />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center">
          {workshopList.map((workshop) => (
            <button
              key={workshop.id}
              type="button"
              onClick={() => setSelectedWorkshop(workshop)}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-black shadow-lg"
            >
              <img
                src={workshop.image_url ?? ""}
                alt={workshop.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedWorkshop} onOpenChange={() => setSelectedWorkshop(null)}>
        <DialogContent className="max-w-3xl p-8 glass-card border-zinc-800/50">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">{selectedWorkshop?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedWorkshop?.subtitle}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 md:grid-cols-[240px_1fr] items-start">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
              {selectedWorkshop?.image_url && (
                <img
                  src={selectedWorkshop.image_url}
                  alt={selectedWorkshop.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <div className="space-y-4 text-left">
              <p className="text-base md:text-lg text-white/90">{selectedWorkshop?.description}</p>
              {selectedWorkshop?.highlights?.length ? (
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  {selectedWorkshop.highlights.map((item, idx) => (
                    <li key={`${selectedWorkshop.id}-hl-${idx}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {selectedWorkshop?.link_url ? (
                <Button asChild className="mt-2">
                  <a href={selectedWorkshop.link_url} target="_blank" rel="noreferrer">
                    Register
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WorkshopsSection;
