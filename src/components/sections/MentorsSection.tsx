import { useEffect, useState } from "react";
import { InteractiveProductCard } from "@/components/ui/card-7";
import ShinyText from "@/components/ui/ShinyText";
import { fetchTable } from "@/lib/supabaseData";

type MentorRecord = {
  id: string;
  name: string;
  title: string;
  image_url?: string | null;
  logo_url?: string | null;
  profile_url?: string | null;
  sort_order?: number | null;
};

const MentorsSection = () => {
  const [guests, setGuests] = useState<MentorRecord[]>([]);
  const [mentors, setMentors] = useState<MentorRecord[]>([]);
  const [judges, setJudges] = useState<MentorRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const guestsData = await fetchTable<MentorRecord>("guests", "sort_order");
      const mentorsData = await fetchTable<MentorRecord>("mentors", "sort_order");
      const judgesData = await fetchTable<MentorRecord>("judges", "sort_order");
      if (guestsData) setGuests(guestsData);
      if (mentorsData) setMentors(mentorsData);
      if (judgesData) setJudges(judgesData);
    };
    loadData();
  }, []);

  const guestList = guests
    .filter(item => (item.image_url ?? "").trim().length > 0)
    .slice(0, 6);
  const mentorList = mentors
    .filter(item => (item.image_url ?? "").trim().length > 0)
    .slice(0, 12);
  const judgeList = judges
    .filter(item => (item.image_url ?? "").trim().length > 0)
    .slice(0, 6);

  if (guestList.length === 0 && mentorList.length === 0 && judgeList.length === 0) {
    return null;
  }

  return (
    <section id="mentors" className="relative min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] md:text-[clamp(3rem,7vw,9rem)] font-bold text-center mb-4 md:whitespace-nowrap">
          <ShinyText
            text="Esteemed Guests"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            className="block"
          />
        </h2>

        {guestList.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 md:whitespace-nowrap">
              <ShinyText
                text="Guest of Honour"
                speed={2}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                className="block"
              />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto justify-items-center">
              {guestList.map((guest) => (
                <InteractiveProductCard
                  key={guest.id}
                  title={guest.name}
                  description={guest.title}
                  imageUrl={guest.image_url ?? ""}
                  logoUrl={guest.logo_url ?? undefined}
                  showOverlay={false}
                  className={guest.profile_url ? "cursor-pointer" : undefined}
                  onClick={
                    guest.profile_url
                      ? () => window.open(guest.profile_url as string, "_blank", "noopener,noreferrer")
                      : undefined
                  }
                  role={guest.profile_url ? "button" : undefined}
                  tabIndex={guest.profile_url ? 0 : undefined}
                  onKeyDown={
                    guest.profile_url
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            window.open(guest.profile_url as string, "_blank", "noopener,noreferrer");
                          }
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        )}

        {mentorList.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 md:whitespace-nowrap">
              <ShinyText
                text="Mentors"
                speed={2}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                className="block"
              />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto justify-items-center">
            {mentorList.map((mentor) => (
              <InteractiveProductCard
                key={mentor.id}
                title={mentor.name}
                description={mentor.title}
                imageUrl={mentor.image_url ?? ""}
                logoUrl={mentor.logo_url ?? undefined}
                showOverlay={false}
                className={mentor.profile_url ? "cursor-pointer" : undefined}
                onClick={
                  mentor.profile_url
                    ? () => window.open(mentor.profile_url as string, "_blank", "noopener,noreferrer")
                    : undefined
                }
                role={mentor.profile_url ? "button" : undefined}
                tabIndex={mentor.profile_url ? 0 : undefined}
                onKeyDown={
                  mentor.profile_url
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          window.open(mentor.profile_url as string, "_blank", "noopener,noreferrer");
                        }
                      }
                    : undefined
                }
              />
            ))}
            </div>
          </div>
        )}

        {judgeList.length > 0 && (
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 md:whitespace-nowrap">
              <ShinyText
                text="Jury "
                speed={2}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                className="block"
              />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto justify-items-center">
            {judgeList.map((judge) => (
              <InteractiveProductCard
                key={judge.id}
                title={judge.name}
                description={judge.title}
                imageUrl={judge.image_url ?? ""}
                logoUrl={judge.logo_url ?? undefined}
                showOverlay={false}
                className={judge.profile_url ? "cursor-pointer" : undefined}
                onClick={
                  judge.profile_url
                    ? () => window.open(judge.profile_url as string, "_blank", "noopener,noreferrer")
                    : undefined
                }
                role={judge.profile_url ? "button" : undefined}
                tabIndex={judge.profile_url ? 0 : undefined}
                onKeyDown={
                  judge.profile_url
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          window.open(judge.profile_url as string, "_blank", "noopener,noreferrer");
                        }
                      }
                    : undefined
                }
              />
            ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MentorsSection;
