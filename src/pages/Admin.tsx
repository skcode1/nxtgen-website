import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShinyText from "@/components/ui/ShinyText";

type Mentor = {
  id: string;
  name: string;
  title: string;
  image_url?: string | null;
  logo_url?: string | null;
  profile_url?: string | null;
  sort_order?: number | null;
};

type Judge = Mentor;
type Guest = Mentor;

type Workshop = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url?: string | null;
  link_url?: string | null;
  highlights?: string[] | null;
  sort_order?: number | null;
};

type Sponsor = {
  id: string;
  name: string;
  logo_url?: string | null;
  website_url?: string | null;
  sort_order?: number | null;
};

const tabs = ["Guests", "Mentors", "Judges", "Workshops", "Sponsors"] as const;
type Tab = (typeof tabs)[number];

const AdminPage = () => {
  const supabase = getSupabaseClient();
  const [activeTab, setActiveTab] = useState<Tab>("Mentors");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const allowlist = useMemo(() => {
    const raw = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined) ?? "";
    return raw
      .split(",")
      .map(value => value.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [judges, setJudges] = useState<Judge[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [guestForm, setGuestForm] = useState({
    profile_url: "",
    sort_order: "",
  });
  const [guestImageFile, setGuestImageFile] = useState<File | null>(null);
  const [mentorForm, setMentorForm] = useState({
    profile_url: "",
    sort_order: "",
  });
  const [mentorImageFile, setMentorImageFile] = useState<File | null>(null);

  const [judgeForm, setJudgeForm] = useState({
    profile_url: "",
    sort_order: "",
  });
  const [judgeImageFile, setJudgeImageFile] = useState<File | null>(null);
  const [workshopForm, setWorkshopForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    highlights: "",
    link_url: "",
    sort_order: "",
  });
  const [workshopImageFile, setWorkshopImageFile] = useState<File | null>(null);
  const [sponsorForm, setSponsorForm] = useState({
    name: "",
    website_url: "",
    sort_order: "",
  });
  const [sponsorLogoFile, setSponsorLogoFile] = useState<File | null>(null);
  const storageBucket =
    (import.meta.env.VITE_SUPABASE_STORAGE_BUCKET as string | undefined) ?? "admin-uploads";

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setAuthError("Supabase env vars missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }

    let mounted = true;
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      const email = data.user?.email?.toLowerCase() ?? null;
      setUserEmail(email);
      setLoading(false);
    };

    init();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email?.toLowerCase() ?? null;
      setUserEmail(email);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const isAuthorized = !!userEmail && (allowlist.length === 0 || allowlist.includes(userEmail));

  useEffect(() => {
    if (!supabase || !isAuthorized) return;
    const loadAll = async () => {
      const [guestsData, mentorsData, judgesData, workshopsData, sponsorsData] = await Promise.all([
        supabase.from("guests").select("*").order("sort_order", { ascending: true }),
        supabase.from("mentors").select("*").order("sort_order", { ascending: true }),
        supabase.from("judges").select("*").order("sort_order", { ascending: true }),
        supabase.from("workshops").select("*").order("sort_order", { ascending: true }),
        supabase.from("sponsors").select("*").order("sort_order", { ascending: true }),
      ]);
      if (guestsData.data) setGuests(guestsData.data as Guest[]);
      if (mentorsData.data) setMentors(mentorsData.data as Mentor[]);
      if (judgesData.data) setJudges(judgesData.data as Judge[]);
      if (workshopsData.data) setWorkshops(workshopsData.data as Workshop[]);
      if (sponsorsData.data) setSponsors(sponsorsData.data as Sponsor[]);
    };
    loadAll();
  }, [supabase, isAuthorized]);

  const handleLogin = async () => {
    if (!supabase) return;
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  const insertRow = async (table: string, payload: Record<string, any>) => {
    if (!supabase) return;
    const { error } = await supabase.from(table).insert(payload);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setAuthError(null);
    const { data } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
    if (!data) return;
    if (table === "guests") setGuests(data as Guest[]);
    if (table === "mentors") setMentors(data as Mentor[]);
    if (table === "judges") setJudges(data as Judge[]);
    if (table === "workshops") setWorkshops(data as Workshop[]);
    if (table === "sponsors") setSponsors(data as Sponsor[]);
  };

  const updateRow = async (table: string, id: string, payload: Record<string, any>) => {
    if (!supabase) return;
    const { error } = await supabase.from(table).update(payload).eq("id", id);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setAuthError(null);
    const { data } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
    if (!data) return;
    if (table === "guests") setGuests(data as Guest[]);
    if (table === "mentors") setMentors(data as Mentor[]);
    if (table === "judges") setJudges(data as Judge[]);
    if (table === "workshops") setWorkshops(data as Workshop[]);
    if (table === "sponsors") setSponsors(data as Sponsor[]);
  };

  const deleteRow = async (table: string, id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setAuthError(null);
    if (table === "guests") setGuests(prev => prev.filter(item => item.id !== id));
    if (table === "mentors") setMentors(prev => prev.filter(item => item.id !== id));
    if (table === "judges") setJudges(prev => prev.filter(item => item.id !== id));
    if (table === "workshops") setWorkshops(prev => prev.filter(item => item.id !== id));
    if (table === "sponsors") setSponsors(prev => prev.filter(item => item.id !== id));
  };

  const uploadImage = async (file: File | null, folder: string) => {
    if (!supabase || !file) return null;
    try {
      const ext = file.name.split(".").pop() || "png";
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      const path = `${folder}/${Date.now()}-${id}.${ext}`;
      const { error } = await supabase.storage.from(storageBucket).upload(path, file, {
        upsert: true,
      });
      if (error) {
        setAuthError(error.message);
        return null;
      }
      const { data } = supabase.storage.from(storageBucket).getPublicUrl(path);
      return data.publicUrl ?? null;
    } catch (err) {
      setAuthError("Upload failed. Please try again.");
      return null;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Supabase config missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-white">
        <ShinyText text="Admin Dashboard" speed={2} color="#b5b5b5" shineColor="#ffffff" />
        <Button onClick={handleLogin} className="px-8 py-5 text-lg">Sign in with Google</Button>
        {authError && <p className="text-red-400">{authError}</p>}
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-xl">Access denied for {userEmail}.</p>
        <Button onClick={handleLogout}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl font-bold">
            <ShinyText text="Admin Dashboard" speed={2} color="#b5b5b5" shineColor="#ffffff" />
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
        <p className="text-white/70">
          Manage guests of honour, mentors, jury, workshops, sponsors, and previous ventures.
        </p>
        {activeTab === "Guests" && (
          <Card className="bg-black border-white/10">
            <CardHeader>
              <CardTitle>Add Guest of Honour</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input type="file" accept="image/*" onChange={e => setGuestImageFile(e.target.files?.[0] ?? null)} />
                <Input
                  placeholder="Profile URL (optional)"
                  value={guestForm.profile_url ?? ""}
                  onChange={e => setGuestForm({ ...guestForm, profile_url: e.target.value })}
                />
                <Input placeholder="Sort order (number)" value={guestForm.sort_order} onChange={e => setGuestForm({ ...guestForm, sort_order: e.target.value })} />
              </div>
              <Button
                onClick={async () => {
                  const imageUrl = await uploadImage(guestImageFile, "guests");
                  insertRow("guests", {
                    name: "Guest of Honour",
                    title: "Guest of Honour",
                    image_url: imageUrl,
                    profile_url: guestForm.profile_url || null,
                    sort_order: guestForm.sort_order ? Number(guestForm.sort_order) : null,
                  });
                  setGuestImageFile(null);
                }}
              >
                Add Guest
              </Button>
              <div className="grid md:grid-cols-2 gap-3">
                {guests.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border border-white/10 rounded-lg p-3">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.profile_url ?? ""}
                        onChange={e => updateRow("guests", item.id, { profile_url: e.target.value })}
                        placeholder="Profile URL"
                      />
                      <Input
                        value={item.sort_order ?? ""}
                        onChange={e => updateRow("guests", item.id, { sort_order: Number(e.target.value) || null })}
                        placeholder="Sort order"
                      />
                    </div>
                    <Button variant="destructive" onClick={() => deleteRow("guests", item.id)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {authError && <p className="text-red-400">{authError}</p>}

        <div className="flex flex-wrap gap-3">
          {tabs.map(tab => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {activeTab === "Mentors" && (
          <Card className="bg-black border-white/10">
            <CardHeader>
              <CardTitle>Add Mentor</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input type="file" accept="image/*" onChange={e => setMentorImageFile(e.target.files?.[0] ?? null)} />
                <Input
                  placeholder="Profile URL (optional)"
                  value={mentorForm.profile_url ?? ""}
                  onChange={e => setMentorForm({ ...mentorForm, profile_url: e.target.value })}
                />
                <Input placeholder="Sort order (number)" value={mentorForm.sort_order} onChange={e => setMentorForm({ ...mentorForm, sort_order: e.target.value })} />
              </div>
              <Button
                onClick={async () => {
                  const imageUrl = await uploadImage(mentorImageFile, "mentors");
                  insertRow("mentors", {
                    name: "Mentor",
                    title: "Mentor",
                    image_url: imageUrl,
                    profile_url: mentorForm.profile_url || null,
                    sort_order: mentorForm.sort_order ? Number(mentorForm.sort_order) : null,
                  });
                  setMentorImageFile(null);
                }}
              >
                Add Mentor
              </Button>
              <div className="grid md:grid-cols-2 gap-3">
                {mentors.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border border-white/10 rounded-lg p-3">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.profile_url ?? ""}
                        onChange={e => updateRow("mentors", item.id, { profile_url: e.target.value })}
                        placeholder="Profile URL"
                      />
                      <Input
                        value={item.sort_order ?? ""}
                        onChange={e => updateRow("mentors", item.id, { sort_order: Number(e.target.value) || null })}
                        placeholder="Sort order"
                      />
                    </div>
                    <Button variant="destructive" onClick={() => deleteRow("mentors", item.id)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "Judges" && (
          <Card className="bg-black border-white/10">
            <CardHeader>
              <CardTitle>Add Judge</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input type="file" accept="image/*" onChange={e => setJudgeImageFile(e.target.files?.[0] ?? null)} />
                <Input
                  placeholder="Profile URL (optional)"
                  value={judgeForm.profile_url ?? ""}
                  onChange={e => setJudgeForm({ ...judgeForm, profile_url: e.target.value })}
                />
                <Input placeholder="Sort order (number)" value={judgeForm.sort_order} onChange={e => setJudgeForm({ ...judgeForm, sort_order: e.target.value })} />
              </div>
              <Button
                onClick={async () => {
                  const imageUrl = await uploadImage(judgeImageFile, "judges");
                  insertRow("judges", {
                    name: "Judge",
                    title: "Judge",
                    image_url: imageUrl,
                    profile_url: judgeForm.profile_url || null,
                    sort_order: judgeForm.sort_order ? Number(judgeForm.sort_order) : null,
                  });
                  setJudgeImageFile(null);
                }}
              >
                Add Judge
              </Button>
              <div className="grid md:grid-cols-2 gap-3">
                {judges.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border border-white/10 rounded-lg p-3">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.profile_url ?? ""}
                        onChange={e => updateRow("judges", item.id, { profile_url: e.target.value })}
                        placeholder="Profile URL"
                      />
                      <Input
                        value={item.sort_order ?? ""}
                        onChange={e => updateRow("judges", item.id, { sort_order: Number(e.target.value) || null })}
                        placeholder="Sort order"
                      />
                    </div>
                    <Button variant="destructive" onClick={() => deleteRow("judges", item.id)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "Workshops" && (
          <Card className="bg-black border-white/10">
            <CardHeader>
              <CardTitle>Add Workshop</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="Title" value={workshopForm.title} onChange={e => setWorkshopForm({ ...workshopForm, title: e.target.value })} />
                <Input placeholder="Subtitle" value={workshopForm.subtitle} onChange={e => setWorkshopForm({ ...workshopForm, subtitle: e.target.value })} />
                <Input type="file" accept="image/*" onChange={e => setWorkshopImageFile(e.target.files?.[0] ?? null)} />
                <Input placeholder="Highlights (comma-separated)" value={workshopForm.highlights} onChange={e => setWorkshopForm({ ...workshopForm, highlights: e.target.value })} />
                <Input placeholder="Link URL" value={workshopForm.link_url} onChange={e => setWorkshopForm({ ...workshopForm, link_url: e.target.value })} />
                <Input placeholder="Sort order (number)" value={workshopForm.sort_order} onChange={e => setWorkshopForm({ ...workshopForm, sort_order: e.target.value })} />
              </div>
              <Textarea placeholder="Description" value={workshopForm.description} onChange={e => setWorkshopForm({ ...workshopForm, description: e.target.value })} />
              <Button
                onClick={async () => {
                  const imageUrl = await uploadImage(workshopImageFile, "workshops");
                  const highlights = workshopForm.highlights
                    ? workshopForm.highlights.split(",").map(item => item.trim()).filter(Boolean)
                    : [];
                  insertRow("workshops", {
                    title: workshopForm.title,
                    subtitle: workshopForm.subtitle,
                    description: workshopForm.description,
                    image_url: imageUrl,
                    highlights,
                    link_url: workshopForm.link_url || null,
                    sort_order: workshopForm.sort_order ? Number(workshopForm.sort_order) : null,
                  });
                  setWorkshopImageFile(null);
                }}
              >
                Add Workshop
              </Button>
              <div className="grid md:grid-cols-2 gap-3">
                {workshops.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border border-white/10 rounded-lg p-3">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.link_url ?? ""}
                        onChange={e => updateRow("workshops", item.id, { link_url: e.target.value })}
                        placeholder="Link URL"
                      />
                      <Input
                        value={item.sort_order ?? ""}
                        onChange={e => updateRow("workshops", item.id, { sort_order: Number(e.target.value) || null })}
                        placeholder="Sort order"
                      />
                    </div>
                    <Button variant="destructive" onClick={() => deleteRow("workshops", item.id)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "Sponsors" && (
          <Card className="bg-black border-white/10">
            <CardHeader>
              <CardTitle>Add Sponsor</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="Name" value={sponsorForm.name} onChange={e => setSponsorForm({ ...sponsorForm, name: e.target.value })} />
                <Input type="file" accept="image/*" onChange={e => setSponsorLogoFile(e.target.files?.[0] ?? null)} />
                <Input placeholder="Website URL (optional)" value={sponsorForm.website_url} onChange={e => setSponsorForm({ ...sponsorForm, website_url: e.target.value })} />
                <Input placeholder="Sort order (number)" value={sponsorForm.sort_order} onChange={e => setSponsorForm({ ...sponsorForm, sort_order: e.target.value })} />
              </div>
              <Button
                onClick={async () => {
                  const logoUrl = await uploadImage(sponsorLogoFile, "sponsors");
                  insertRow("sponsors", {
                    name: sponsorForm.name,
                    logo_url: logoUrl,
                    website_url: sponsorForm.website_url || null,
                    sort_order: sponsorForm.sort_order ? Number(sponsorForm.sort_order) : null,
                  });
                  setSponsorLogoFile(null);
                }}
              >
                Add Sponsor
              </Button>
              <div className="grid md:grid-cols-2 gap-3">
                {sponsors.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border border-white/10 rounded-lg p-3">
                    {item.logo_url && (
                      <img src={item.logo_url} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                    )}
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.website_url ?? ""}
                        onChange={e => updateRow("sponsors", item.id, { website_url: e.target.value })}
                        placeholder="Website URL"
                      />
                      <Input
                        value={item.sort_order ?? ""}
                        onChange={e => updateRow("sponsors", item.id, { sort_order: Number(e.target.value) || null })}
                        placeholder="Sort order"
                      />
                    </div>
                    <Button variant="destructive" onClick={() => deleteRow("sponsors", item.id)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
};

export default AdminPage;
