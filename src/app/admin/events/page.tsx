"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Users,
  MapPin,
  Video,
  Download,
  Search,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  X,
} from "lucide-react";
import { PlatformEvent, EventRegistration } from "@/lib/data-store";
import { ImageUploader } from "@/components/admin/image-uploader";
import { useAdmin } from "../layout";

export default function EventsAdminPage() {
  const { can } = useAdmin();
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<PlatformEvent | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<PlatformEvent["category"]>("Product Studio");
  const [date, setDate] = useState("");
  const [locationType, setLocationType] = useState<"physical" | "virtual" | "hybrid">("hybrid");
  const [venueName, setVenueName] = useState("Edo Innovation Hub");
  const [address, setAddress] = useState("Benin City, Edo State");
  const [virtualLink, setVirtualLink] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [capacity, setCapacity] = useState(150);
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [featured, setFeatured] = useState(false);

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/admin/events?withRegistrations=true");
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
        setRegistrations(data.registrations || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setTitle("");
    setDescription("");
    setCategory("Product Studio");
    setDate("2026-11-20T10:00");
    setLocationType("hybrid");
    setVenueName("Edo Innovation Hub");
    setAddress("Benin City, Edo State");
    setVirtualLink("https://meet.edotech.community");
    setBannerUrl("https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80");
    setCapacity(150);
    setStatus("published");
    setFeatured(false);
    setIsEventModalOpen(true);
  };

  const handleOpenEdit = (evt: PlatformEvent) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setDescription(evt.description);
    setCategory(evt.category);
    setDate(evt.date.substring(0, 16));
    setLocationType(evt.locationType);
    setVenueName(evt.venueName);
    setAddress(evt.address);
    setVirtualLink(evt.virtualLink || "");
    setBannerUrl(evt.bannerUrl);
    setCapacity(evt.capacity);
    setStatus(evt.status === "draft" ? "draft" : "published");
    setFeatured(evt.featured);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    try {
      if (editingEvent) {
        const res = await fetch("/api/admin/events", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingEvent.id,
            title,
            description,
            category,
            date: new Date(date).toISOString(),
            locationType,
            venueName,
            address,
            virtualLink,
            bannerUrl,
            capacity: Number(capacity),
            status,
            featured,
          }),
        });
        if (res.ok) setFeedback(`Event "${title}" updated successfully.`);
      } else {
        const res = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            category,
            date: new Date(date).toISOString(),
            locationType,
            venueName,
            address,
            virtualLink,
            bannerUrl,
            capacity: Number(capacity),
            status,
            featured,
          }),
        });
        if (res.ok) setFeedback(`Event "${title}" created and published!`);
      }

      setIsEventModalOpen(false);
      loadEvents();
      setTimeout(() => setFeedback(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: string, name: string) => {
    if (!confirm(`Delete event "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback(`Event "${name}" removed.`);
        loadEvents();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const exportAttendeesCSV = (eventTitle: string, attendees: EventRegistration[]) => {
    const headers = ["Name", "Email", "Phone", "Role", "Attendance Mode", "Date"];
    const rows = attendees.map((a) => [
      a.name,
      a.email,
      a.phone || "",
      a.role,
      a.attendanceMode,
      new Date(a.createdAt).toLocaleDateString(),
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${eventTitle.replace(/[^a-z0-9]/gi, "_")}_attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary mb-2">
            <Calendar className="size-3.5" />
            <span>Native Event Hosting Engine</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Self-Hosted Events & RSVPs
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Create, host, and schedule innovation sprints, workshops, and fellowship kickoffs across Benin, Auchi, and virtual hubs.
          </p>
        </div>

        {can("events.create") && (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary hover:bg-secondary/90 px-4 py-2.5 text-xs font-bold text-black transition shadow-lg shadow-secondary/10 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Host New Event</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="rounded-2xl border border-green-400/30 bg-green-500/10 p-4 flex items-center gap-3 text-sm text-green-200">
          <CheckCircle2 className="size-5 text-green-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {events.map((evt) => {
          const eventAttendees = registrations.filter((r) => r.eventId === evt.id);
          const isSelected = selectedEventId === evt.id;

          return (
            <div
              key={evt.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-6 relative overflow-hidden transition hover:border-white/20"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-secondary bg-secondary/10 border border-secondary/30 px-2.5 py-0.5 rounded-full">
                      {evt.category}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                      {evt.locationType}
                    </span>
                    {evt.featured && (
                      <span className="text-[10px] uppercase font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="size-3" />
                        Homepage Flagship
                      </span>
                    )}
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      evt.status === "published" ? "text-green-400 bg-green-400/10" : "text-neutral-400 bg-white/5"
                    }`}>
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading">{evt.title}</h3>
                  <p className="text-xs text-neutral-300 max-w-3xl leading-relaxed">{evt.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <Calendar className="size-3.5 text-secondary" />
                      {new Date(evt.date).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-secondary" />
                      {evt.venueName} ({evt.address})
                    </span>
                    {evt.virtualLink && (
                      <a href={evt.virtualLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-secondary hover:underline">
                        <Video className="size-3.5" />
                        Live Stream Link
                      </a>
                    )}
                  </div>
                </div>

                {/* Event Actions & Capacity Stats */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10 shrink-0">
                  <div className="text-left lg:text-right">
                    <p className="text-2xl font-bold text-secondary font-heading">
                      {evt.registeredCount} / {evt.capacity}
                    </p>
                    <p className="text-[11px] text-neutral-400">Registered RSVPs</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {can("events.view_attendees") && (
                      <button
                        onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition cursor-pointer"
                      >
                        <Users className="size-3.5 text-secondary" />
                        <span>{isSelected ? "Hide RSVPs" : "View RSVPs"}</span>
                      </button>
                    )}

                    {can("events.edit") && (
                      <button
                        onClick={() => handleOpenEdit(evt)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition cursor-pointer"
                        title="Edit event"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                    )}

                    {can("events.delete") && (
                      <button
                        onClick={() => handleDeleteEvent(evt.id, evt.title)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                        title="Delete event"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Attendee Drawer Table */}
              {isSelected && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="size-4 text-secondary" />
                      Registered Attendees ({eventAttendees.length})
                    </h4>
                    {can("events.export_csv") && eventAttendees.length > 0 && (
                      <button
                        onClick={() => exportAttendeesCSV(evt.title, eventAttendees)}
                        className="inline-flex items-center gap-1.5 text-xs text-secondary hover:underline font-semibold cursor-pointer"
                      >
                        <Download className="size-3.5" />
                        <span>Export CSV</span>
                      </button>
                    )}
                  </div>

                  {eventAttendees.length === 0 ? (
                    <p className="text-xs text-neutral-400 p-4 rounded-2xl bg-black/40 text-center">
                      No registrations recorded for this event yet.
                    </p>
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                      <table className="w-full text-left text-xs text-neutral-300">
                        <thead className="bg-black/60 text-[10px] uppercase text-neutral-400 border-b border-white/10">
                          <tr>
                            <th className="px-4 py-3">Attendee Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role / Track</th>
                            <th className="px-4 py-3">Mode</th>
                            <th className="px-4 py-3">HubSpot Sync</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {eventAttendees.map((att) => (
                            <tr key={att.id}>
                              <td className="px-4 py-3 font-semibold text-white">{att.name}</td>
                              <td className="px-4 py-3 text-neutral-400">{att.email}</td>
                              <td className="px-4 py-3 text-neutral-300">{att.role}</td>
                              <td className="px-4 py-3 capitalize text-secondary">{att.attendanceMode}</td>
                              <td className="px-4 py-3">
                                <span className="text-green-400 flex items-center gap-1 text-[11px]">
                                  <CheckCircle2 className="size-3" />
                                  Synced
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create / Edit Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl border border-white/10 bg-[#0E121E] w-full max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {editingEvent ? "Edit Event" : "Host New Community Event"}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Publish to the Edo Tech event calendar and open real-time RSVPs.
                </p>
              </div>
              <button onClick={() => setIsEventModalOpen(false)} className="p-2 text-neutral-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paty Innovation Sprint: Civic AI"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What will attendees build, learn, or experience?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  >
                    <option value="Product Studio">Product Studio</option>
                    <option value="Talent">Talent</option>
                    <option value="Community">Community</option>
                    <option value="Civic Tech">Civic Tech</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Location Format
                  </label>
                  <select
                    value={locationType}
                    onChange={(e: any) => setLocationType(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  >
                    <option value="hybrid">Hybrid (Physical Hub + Virtual)</option>
                    <option value="physical">Physical Only (Hub)</option>
                    <option value="virtual">Virtual Livestream</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Capacity Limit
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold uppercase tracking-wider mb-1">
                    Virtual Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://meet.edotech.community"
                    value={virtualLink}
                    onChange={(e) => setVirtualLink(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploader
                label="Event Banner Image"
                value={bannerUrl}
                onChange={setBannerUrl}
                folder="events"
                placeholder="https://res.cloudinary.com/..."
              />

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-white/20 bg-black text-secondary focus:ring-0"
                  />
                  <span>Feature as Homepage Flagship Event</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={status === "published"}
                    onChange={(e) => setStatus(e.target.checked ? "published" : "draft")}
                    className="rounded border-white/20 bg-black text-secondary focus:ring-0"
                  />
                  <span>Publish Live Immediately</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-neutral-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-black shadow-lg shadow-secondary/10"
                >
                  {editingEvent ? "Update Event" : "Publish Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
